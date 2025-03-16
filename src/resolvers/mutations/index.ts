import {createCourse, deleteCourse, updateCourse} from './courses.js'
import {createProject, deleteProject, updateProject} from './projects.js'
import {createUser, deleteUser, signInUser} from './users.js'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema.js'

export const Mutations: Resolvers = {
	// Users
	createUser,
	signInUser,
	deleteUser,

	// Courses
	createCourse,
	updateCourse,
	deleteCourse,

	// Projects
	createProject,
	updateProject,
	deleteProject,
}
