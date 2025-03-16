import {Courses} from '@app/models.js'
import {Role} from '@app/types/generated/schema.js'
import {authorizeRoleAccess} from '@helpers/authorization.js'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema.js'

const createCourse: Resolvers['createCourse'] = async (
	parent,
	args,
	context,
) => {
	await authorizeRoleAccess(context.user, Role.OWNER)

	const course = await Courses.create(args)
	return course._id.toString( )
}

const updateCourse: Resolvers['updateCourse'] = async (
	parent,
	args,
	context,
) => {
	await authorizeRoleAccess(context.user, Role.OWNER)

	const course = await Courses.updateOne({_id: args.id})
	return course.acknowledged
}

const deleteCourse: Resolvers['deleteCourse'] = async (
	parent,
	args,
	context,
) => {
	await authorizeRoleAccess(context.user, Role.OWNER)

	const course = await Courses.deleteOne({_id: args.id})
	return course.acknowledged
}

export {
	createCourse,
	updateCourse,
	deleteCourse,
}
