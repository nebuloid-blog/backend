import {Courses} from '../models.js'
import type {ProjectResolvers as Resolvers} from '../types/generated/schema.js'

const id: Resolvers['id'] = (project) => (
	project._id.toString( )
)

const name: Resolvers['name'] = (project) => (
	project.name
)

const description: Resolvers['description'] = (project) => (
	project.description ?? null
)

const courses: Resolvers['courses'] = async (project) => {
	if (project.courses == null) return null
	else return await Courses.find({_id: {$in: project.courses}})
}

export const Project: Resolvers = {
	id,
	name,
	description,
	courses,
}
