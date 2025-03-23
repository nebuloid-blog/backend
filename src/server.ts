import fs from 'node:fs'
import {resolvers} from '@app/resolvers'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {env} from '@helpers/secrets'
import bodyParser from 'body-parser'
import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {expressjwt as expressJWT} from 'express-jwt'
import mongoose from 'mongoose'
import type {Context} from '@app/types/context'
import type {Request as JWTRequest} from 'express-jwt'

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

	const app = express( )
	await mongoose.connect(DB_URL)

	// Import the schema's data types and build it with GraphQL.
	const rawSchema = await fs.promises.readFile(SCHEMA_FILE, 'utf8')
	const schema = makeExecutableSchema({
		typeDefs: [DIRECTIVES, rawSchema],
		resolvers: resolvers,
	})

	// Feed middleware & options to the express server.
	app.use(
		// API URI path...
		'/',

		// This handler reformats the body into JS objects.
		bodyParser.json( ),

		// This reads JWTs using the secret access code.
		expressJWT({
			secret: ACCESS_TOKEN_SECRET,
			algorithms: ['HS256'],
			credentialsRequired: false,
		}),

		// Connect GraphQL schema (and add payload to context).
		graphqlHTTP((request, response, params) => {
			const jwtRequest = request as JWTRequest<Context>
			const payload = jwtRequest.auth ?? null

			return ({
				graphiql: false,
				schema: schema,
				context: payload,
			})
		}),
	)

	// Finally, start the express server.
	app.listen(PORT, ( ) => {
		if (env.NODE_ENV === 'development') {
			console.info(`\nServer started on port ${PORT}.`)
			console.info(`http://localhost:${PORT}/`)
		}
	})
}

void main( )
