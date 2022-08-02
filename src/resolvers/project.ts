import type {ProjectResolvers} from '../generated/types.js'
import {Courses} from '../models.js'

const id: ProjectResolvers['id'] = (project) => (
	project._id.toString( )
)

const name: ProjectResolvers['name'] = (project) => (
	project.name
)

const description: ProjectResolvers['description'] = (project) => (
	project.description ?? null
)

const courses: ProjectResolvers['courses'] = async (project) => {
	if (project.courses == null) return null
	else return await Courses.find({_id: {$in: project.courses}})
}

export const Project: ProjectResolvers = {
	id,
	name,
	description,
	courses,
}
