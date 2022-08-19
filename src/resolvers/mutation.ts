import bcrypt from 'bcrypt'
import type {MutationResolvers} from '../generated/types.js'
import {signJWT} from '../helpers/secrets.js'
import {Courses, Projects, Users} from '../models.js'

/* USERS */
const createUser: MutationResolvers['createUser'] = async (parent, args) => {
	const user = await Users.create({
		email: args.email.trim( ),
		username: args.username.trim( ),
		password: await bcrypt.hash(args.password, 12),
	})

	return signJWT(user)
}

const signInUser: MutationResolvers['signInUser'] = async (parent, args) => {
	const AuthError = new Error('Incorrect username or password')

	const user = await Users.findOne({username: args.username})
	if (user == null) throw AuthError

	const passwordIsValid = await bcrypt.compare(args.password, user.password)
	if (!passwordIsValid) throw AuthError

	return signJWT(user)
}

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
