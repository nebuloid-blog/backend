import type {Resolvers} from './generated/types.js'
import {Course} from './resolvers/course.js'
import {Project} from './resolvers/project.js'
import {Query} from './resolvers/query.js'

export const resolvers: Resolvers = {
	Course,
	Project,
	Query,
}
