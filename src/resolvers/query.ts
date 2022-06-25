import type {QueryResolvers} from '../generated/types.js'
import {rootValue} from '../root-values.js'

const course: QueryResolvers['course'] = (parent, args) => (
	rootValue.courses.find((course) => (course._id.toString( ) === args.id)) ?? null
)

const project: QueryResolvers['project'] = (parent, args) => (
	rootValue.projects.find((project) => (project._id.toString( ) === args.id)) ?? null
)

const indexCourses: QueryResolvers['indexCourses'] = (parent, args) => (
	rootValue.courses
)

const indexProjects: QueryResolvers['indexProjects'] = (parent, args) => (
	rootValue.projects
)

export const Query: QueryResolvers = {
	course,
	project,
	indexCourses,
	indexProjects,
}
