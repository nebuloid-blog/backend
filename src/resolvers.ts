import {Course} from './resolvers/course.js'
import {Mutation} from './resolvers/mutation.js'
import {Project} from './resolvers/project.js'
import {Query} from './resolvers/query.js'
import {User} from './resolvers/user.js'
import type {Resolvers} from './types/generated/schema.js'

export const resolvers: Resolvers = {
	User,
	Course,
	Project,

	Query,
	Mutation,
}
