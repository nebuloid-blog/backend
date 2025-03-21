import {Mutations} from './mutations'
import {Course, Project, User} from './objects'
import {Queries} from './queries'
import type {Resolvers} from '@app/types/generated/schema'

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
