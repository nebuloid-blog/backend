import bcrypt from 'bcrypt'
import {authenticateUser} from '../helpers/authentication.js'
import {signJWT} from '../helpers/secrets.js'
import {Courses, Projects, Users} from '../models.js'
import type {MutationResolvers as Resolvers} from '../types/generated/schema.js'

/* USERS */
const createUser: Resolvers['createUser'] = async (parent, args) => {
	const user = await Users.create({
		email: args.email.trim( ),
		username: args.username.trim( ),
		password: await bcrypt.hash(args.password, 12),
	})

	return signJWT(user)
}

const signInUser: Resolvers['signInUser'] = async (parent, args, context) => {
	// Check username & password, and get info via username if good-to-go.
	await authenticateUser(args.username, args.password)
	const user = await Users.findOne({username: args.username})

	return signJWT(user)
}

/* COURSES */
const createCourse: Resolvers['createCourse'] = async (parent, args) => {
	const course = await Courses.create(args)
	return course._id.toString( )
}

const updateCourse: Resolvers['updateCourse'] = async (parent, args) => {
	const course = await Courses.updateOne({_id: args.id})
	return course.acknowledged
}

const deleteCourse: Resolvers['deleteCourse'] = async (parent, args) => {
	const course = await Courses.deleteOne({_id: args.id})
	return course.acknowledged
}

/* PROJECTS */
const createProject: Resolvers['createProject'] = async (parent, args) => {
	const project = await Projects.create(args)
	return project._id.toString( )
}

const updateProject: Resolvers['updateProject'] = async (parent, args) => {
	const project = await Projects.updateOne({_id: args.id})
	return project.acknowledged
}

const deleteProject: Resolvers['deleteProject'] = async (parent, args) => {
	const project = await Projects.deleteOne({_id: args.id})
	return project.acknowledged
}

export const Mutation: Resolvers = {
	// Users
	createUser,
	signInUser,

	// Courses
	createCourse,
	updateCourse,
	deleteCourse,

	// Projects
	createProject,
	updateProject,
	deleteProject,
}
