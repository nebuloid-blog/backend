import type {Resolvers} from './generated/types.js'
import {Course} from './resolvers/course.js'
import {Mutation} from './resolvers/mutation.js'
import {Project} from './resolvers/project.js'
import {Query} from './resolvers/query.js'
import {User} from './resolvers/user.js'

export const resolvers: Resolvers = {
	User,
	Course,
	Project,

	Query,
	Mutation,
}
