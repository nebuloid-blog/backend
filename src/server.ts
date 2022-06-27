import fs from 'fs'
import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'
import {rootValue} from './root-values.js'

const SCHEMA_FILE = 'src/schema.gql'
const PORT = 4000

const main = async ( ) => {
	const app = express( )

	// Import the schema's data types and build it with GraphQL.
	const rawSchema = await fs.promises.readFile(SCHEMA_FILE, 'utf8')
	const schema = buildSchema(rawSchema)

	// Feed options to the express server.
	const options = {
		graphiql: true,
		schema: schema,
		rootValue: rootValue,
	}

	app.use(graphqlHTTP(options))

	// Finally, start the express server.
	app.listen(PORT, ( ) => {
		console.info(`Server started on port ${PORT}.`)
		console.info(`http://localhost:${PORT}/`)
	})
}

void main( )
