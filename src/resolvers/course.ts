import {Projects} from '../models.js'
import type {CourseResolvers} from '../types/generated/schema.js'

const id: CourseResolvers['id'] = (course) => (
	course._id.toString( )
)

const name: CourseResolvers['name'] = (course) => (
	course.name
)

const description: CourseResolvers['description'] = (course) => (
	course.description ?? null
)

const projects: CourseResolvers['projects'] = async (course) => {
	if (course.projects == null) return null
	else return await Projects.find({_id: {$in: course.projects}})
}

export const Course: CourseResolvers = {
	id,
	name,
	description,
	projects,
}
