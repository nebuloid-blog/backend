import type {CourseDbObject, ProjectResolvers} from '../generated/types.js'
import {rootValue} from '../root-values.js'

const id: ProjectResolvers['id'] = (project) => (
	project._id.toString( )
)

const name: ProjectResolvers['name'] = (project) => (
	project.name
)

const description: ProjectResolvers['description'] = (project) => (
	project.description ?? null
)

const courses: ProjectResolvers['courses'] = (project) => {
	if (project.courses == null) {
		return null
	}
	else {
		return project.courses
		.map((courseId) => (
			rootValue.courses.find((course) => (
				courseId === course._id
			))
		))
		.reduce((courses: Array<CourseDbObject> | null, course) => {
			if (course != null) {
				courses ??= []
				courses.push(course)
			}
			return courses
		}, null)
	}
}

export const Project: ProjectResolvers = {
	id,
	name,
	description,
	courses,
}
