import {Projects} from '@app/models/index.js'
import type {CourseResolvers as Resolvers} from '@app/types/generated/schema.js'

const id: Resolvers['id'] = (course) => (
	course._id.toString( )
)

const name: Resolvers['name'] = (course) => (
	course.name
)

const description: Resolvers['description'] = (course) => (
	course.description ?? null
)

const projects: Resolvers['projects'] = async (course) => {
	if (course.projects == null) return null
	else return await Projects.find({_id: {$in: course.projects}})
}

export const Course: Resolvers = {
	id,
	name,
	description,
	projects,
}
