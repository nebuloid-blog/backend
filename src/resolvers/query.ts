import type {QueryResolvers} from '../generated/types.js'
import {Courses, Projects} from '../models.js'

/* USERS */
const me: QueryResolvers['me'] = (parent, args, context) => (
	context.user
)

/* COURSES */
const course: QueryResolvers['course'] = async (parent, args) => (
	await Courses.findOne({id: args.id}) ?? null
)

const indexCourses: QueryResolvers['indexCourses'] = async (parent, args) => (
	await Courses.find({ })
)

/* PROJECTS */
const project: QueryResolvers['project'] = async (parent, args) => (
	await Projects.findOne({id: args.id}) ?? null
)

const indexProjects: QueryResolvers['indexProjects'] = async (parent, args) => (
	await Projects.find({ })
)

export const Query: QueryResolvers = {
	// Users
	me,

	// Courses
	course,
	indexCourses,

	// Projects
	project,
	indexProjects,
}
