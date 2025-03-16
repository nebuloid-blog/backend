import {Mutations} from './mutations/index.js'
import {Course, Project, User} from './objects/index.js'
import {Queries} from './queries/index.js'
import type {Resolvers} from '@app/types/generated/schema.js'

/*
Notice how the entries within this resolvers object are all
	singular nouns (not plural like you might expect).
This is done to help appease the GraphQL Codegen package.
*/
export const resolvers: Resolvers = {
	// Object Resolvers
	User: User,
	Course: Course,
	Project: Project,

	// Operation Resolvers
	Query: Queries,
	Mutation: Mutations,
}
