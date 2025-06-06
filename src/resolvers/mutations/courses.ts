import {Courses} from '@app/models'
import {Role} from '@app/types/generated/schema'
import {authorizeRoleAccess} from '@helpers/authorization'
import {findUserLoginById} from '@helpers/verify-resources'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema'

const createCourse: Resolvers['createCourse'] = async (
	parent,
	args,
	context,
) => {
	// Extract jwt payload from context.
	const payload = context.jwt?.payload

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(payload?.userId)
	await authorizeRoleAccess(currentUser, Role.ADMINISTRATOR)

	const course = await Courses.create(args)
	return course._id.toString( )
}

const updateCourse: Resolvers['updateCourse'] = async (
	parent,
	args,
	context,
) => {
	// Extract jwt payload from context.
	const payload = context.jwt?.payload

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(payload?.userId)
	await authorizeRoleAccess(currentUser, Role.ADMINISTRATOR)

	const course = await Courses.updateOne({_id: args.id})
	return course.acknowledged
}

const deleteCourse: Resolvers['deleteCourse'] = async (
	parent,
	args,
	context,
) => {
	// Extract jwt payload from context.
	const payload = context.jwt?.payload

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(payload?.userId)
	await authorizeRoleAccess(currentUser, Role.ADMINISTRATOR)

	const course = await Courses.deleteOne({_id: args.id})
	return course.acknowledged
}

export {
	createCourse,
	updateCourse,
	deleteCourse,
}
