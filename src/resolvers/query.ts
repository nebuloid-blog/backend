import {Courses, Projects} from '../models.js'
import type {QueryResolvers as Resolvers} from '../types/generated/schema.js'

/* USERS */
const me: Resolvers['me'] = (parent, args, context) => (
	context.user ?? null
)

/* COURSES */
const course: Resolvers['course'] = async (parent, args) => (
	await Courses.findOne({id: args.id}) ?? null
)

const indexCourses: Resolvers['indexCourses'] = async (parent, args) => (
	await Courses.find({ })
)

/* PROJECTS */
const project: Resolvers['project'] = async (parent, args) => (
	await Projects.findOne({id: args.id}) ?? null
)

const indexProjects: Resolvers['indexProjects'] = async (parent, args) => (
	await Projects.find({ })
)

export const Query: Resolvers = {
	// Users
	me,

	// Courses
	course,
	indexCourses,

	// Projects
	project,
	indexProjects,
}
