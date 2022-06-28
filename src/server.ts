import fs from 'fs'
import {makeExecutableSchema} from '@graphql-tools/schema'
import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import mongoose from 'mongoose'
import {resolvers} from './resolvers.js'

const SCHEMA_FILE = 'src/schema.gql'
const DB_URI = 'mongodb://localhost:27017/database'
const PORT = 4000

const main = async ( ) => {
	const app = express( )
	void mongoose.connect(DB_URI)

	// Import the schema's data types and build it with GraphQL.
	const rawSchema = await fs.promises.readFile(SCHEMA_FILE, 'utf8')
	const schema = makeExecutableSchema({
		typeDefs: rawSchema,
		resolvers: resolvers,
	})

	// Feed options to the express server.
	const options = {
		graphiql: true,
		schema: schema,
	}

	app.use(graphqlHTTP(options))

	// Finally, start the express server.
	app.listen(PORT, ( ) => {
		console.info(`Server started on port ${PORT}.`)
		console.info(`http://localhost:${PORT}/`)
	})
}

void main( )
