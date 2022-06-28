import type {CourseResolvers} from '../generated/types.js'
import type {ProjectModel} from '../models.js'
import {rootValue} from '../root-values.js'

const id: CourseResolvers['id'] = (course) => (
	course._id
)

const name: CourseResolvers['name'] = (course) => (
	course.name
)

const description: CourseResolvers['description'] = (course) => (
	course.description ?? null
)

const projects: CourseResolvers['projects'] = (course) => {
	if (course.projects == null) {
		return null
	}
	else {
		return course.projects
		.map((projectId) => (
			rootValue.projects.find((project) => (
				projectId === project._id
			))
		))
		.reduce((projects: Array<ProjectModel> | null, project) => {
			if (project != null) {
				projects ??= []
				projects.push(project)
			}
			return projects
		}, null)
	}
}

export const Course: CourseResolvers = {
	id,
	name,
	description,
	projects,
}
