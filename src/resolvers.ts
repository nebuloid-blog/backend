import type {JwtPayload} from 'jsonwebtoken'
import type {Resolvers, UserDbObject} from './generated/types.js'
import {Course} from './resolvers/course.js'
import {Mutation} from './resolvers/mutation.js'
import {Project} from './resolvers/project.js'
import {Query} from './resolvers/query.js'
import {User} from './resolvers/user.js'

export interface UserContext extends Record<string, unknown>, JwtPayload {
	user: UserDbObject,
}

export const resolvers: Resolvers = {
	User,
	Course,
	Project,

	Query,
	Mutation,
}
