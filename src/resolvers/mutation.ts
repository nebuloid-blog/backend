import type {MutationResolvers} from '../generated/types.js'
import {Courses, Projects} from '../models.js'

// Courses
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

// Projects
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

const Mutation: MutationResolvers = {
	createCourse,
	updateCourse,
	deleteCourse,
	createProject,
	updateProject,
	deleteProject,
}

export {Mutation}
