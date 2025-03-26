import {createCourse, deleteCourse, updateCourse} from './courses'
import {createProject, deleteProject, updateProject} from './projects'

import {
	replaceRefreshToken,
	revokeRefreshToken,
	revokeAllRefreshTokens,
	revokeAllRefreshTokensGlobal,
} from './refresh-tokens'

import {createUser, deleteUser, signInUser} from './users'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema'

export const Mutations: Resolvers = {
	// Users
	createUser,
	signInUser,
	deleteUser,

	// Authentication
	replaceRefreshToken,
	revokeRefreshToken,
	revokeAllRefreshTokens,
	revokeAllRefreshTokensGlobal,

	// Courses
	createCourse,
	updateCourse,
	deleteCourse,

	// Projects
	createProject,
	updateProject,
	deleteProject,
}
