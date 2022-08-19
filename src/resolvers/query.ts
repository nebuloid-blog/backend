import {Courses, Projects} from '../models.js'
import type {QueryResolvers as Resolvers} from '../types/generated/schema.js'

/* USERS */
const getMe: Resolvers['getMe'] = (parent, args, context) => (
	context.user ?? null
)

/* COURSES */
const getCourse: Resolvers['getCourse'] = async (parent, args) => (
	await Courses.findOne({id: args.id}) ?? null
)

const indexCourses: Resolvers['indexCourses'] = async (parent, args) => (
	await Courses.find({ })
)

/* PROJECTS */
const getProject: Resolvers['getProject'] = async (parent, args) => (
	await Projects.findOne({id: args.id}) ?? null
)

const indexProjects: Resolvers['indexProjects'] = async (parent, args) => (
	await Projects.find({ })
)

export const Query: Resolvers = {
	// Users
	getMe,

	// Courses
	getCourse,
	indexCourses,

	// Projects
	getProject,
	indexProjects,
}
