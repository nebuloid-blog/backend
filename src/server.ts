import fs from 'node:fs'
import {createServer} from 'node:http'
import {resolvers} from '@app/resolvers'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'

import {
	createInlineSigningKeyProvider,
	extractFromHeader,
	useJWT,
} from '@graphql-yoga/plugin-jwt'

import {env} from '@helpers/secrets'
import {ORIGIN_URL} from '@helpers/variables'
import {useCookies} from '@whatwg-node/server-plugin-cookies'
import {createSchema, createYoga} from 'graphql-yoga'
import mongoose from 'mongoose'

const {
	PORT,
	DB_URL,
	ACCESS_TOKEN_SECRET,
} = env

const SCHEMA_FILE = 'src/schema.gql'

const main = async ( ) => {
	// Print the DB connection URI if we're on dev.
	if (env.NODE_ENV === 'development') {
		console.info('\nConnecting to database URI...')
		console.info(DB_URL)
	}

	await mongoose.connect(DB_URL)

	// Import the schema's data types and build it with GraphQL.
	const rawSchema = await fs.promises.readFile(SCHEMA_FILE, 'utf8')

	const schema = createSchema({
		typeDefs: [DIRECTIVES, rawSchema],
		resolvers: resolvers,
	})

	const yoga = createYoga({
		graphqlEndpoint: '/',
		schema: schema,

		// Allows credentials (ie, refresh tokens in http cookies)
		cors: {
			origin: [ORIGIN_URL], // Allowed frontend origin
			credentials: true, // Allow cookies and credentials
		},

		plugins: [
			// Make sure to add the useCookies plugin
			//   before the useJWT plugin.
			useCookies( ),

			useJWT({
				// Configure your signing providers:
				//   either a local signing-key or a remote JWKS are supported.
				signingKeyProviders: [
					// This will extract the jwt using the env secret.
					createInlineSigningKeyProvider(ACCESS_TOKEN_SECRET),
				],

				// Configure where to look for the JWT token:
				//   in the headers, or cookies.
				// By default, the plugin will look for
				//   the token in the 'authorization' header only.
				tokenLookupLocations: [
					extractFromHeader({
						name: 'Authorization',
						prefix: 'Bearer',
					}),
				],

				// Configure your token issuers/audience/algorithms
				//   verification options.
				// By default, the plugin will only verify
				//   the HS256/RS256 algorithms.
				// Please note that this should match the
				//   JWT signer issuer/audience/algorithms.
				tokenVerification: {
					algorithms: ['HS256'],
				},

				// Configure context injection after the token is verified.
				// By default, the plugin will inject the token's payload
				//   into the context into the `jwt` field.
				// You can pass a string: `"myJwt"` to change the field name.
				extendContext: true,

				// The plugin can reject the request if the token is missing
				//   or invalid (doesn't pass JWT `verify` flow).
				// By default, the plugin will reject the request if the token
				//   is missing or invalid.
				reject: {
					invalidToken: false,
					missingToken: false,
				},
			}),
		],
	})

	const server = createServer(yoga)

	// Finally, start the express server.
	server.listen(PORT, ( ) => {
		if (env.NODE_ENV === 'development') {
			console.info(`\nServer started on port ${PORT}.`)
			console.info(`http://localhost:${PORT}/`)
		}
	})
}

void main( )
