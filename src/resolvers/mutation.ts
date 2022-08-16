import type {MutationResolvers} from '../generated/types.js'
import {Courses, Projects} from '../models.js'

/* COURSES */
const createCourse: MutationResolvers['createCourse'] = async (parent, args) => {
	const course = await Courses.create(args)
	return course._id.toString( )
}

const updateCourse: MutationResolvers['updateCourse'] = async (parent, args) => {
	const course = await Courses.updateOne({_id: args.id})
	return course.acknowledged
}

const deleteCourse: MutationResolvers['deleteCourse'] = async (parent, args) => {
	const course = await Courses.deleteOne({_id: args.id})
	return course.acknowledged
}

/* PROJECTS */
const createProject: MutationResolvers['createProject'] = async (parent, args) => {
	const project = await Projects.create(args)
	return project._id.toString( )
}

const updateProject: MutationResolvers['updateProject'] = async (parent, args) => {
	const project = await Projects.updateOne({_id: args.id})
	return project.acknowledged
}

const deleteProject: MutationResolvers['deleteProject'] = async (parent, args) => {
	const project = await Projects.deleteOne({_id: args.id})
	return project.acknowledged
}

export const Mutation: MutationResolvers = {
	// Courses
	createCourse,
	updateCourse,
	deleteCourse,

	// Projects
	createProject,
	updateProject,
	deleteProject,
}
