import {Projects} from '@app/models'
import {Role} from '@app/types/generated/schema'
import {authorizeRoleAccess} from '@helpers/authorization'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema'

const createProject: Resolvers['createProject'] = async (
	parent,
	args,
	context,
) => {
	await authorizeRoleAccess(context.user, Role.OWNER)

	const project = await Projects.create(args)
	return project._id.toString( )
}

const updateProject: Resolvers['updateProject'] = async (
	parent,
	args,
	context,
) => {
	await authorizeRoleAccess(context.user, Role.OWNER)

	const project = await Projects.updateOne({_id: args.id})
	return project.acknowledged
}

const deleteProject: Resolvers['deleteProject'] = async (
	parent,
	args,
	context,
) => {
	await authorizeRoleAccess(context.user, Role.OWNER)

	const project = await Projects.deleteOne({_id: args.id})
	return project.acknowledged
}

export {
	createProject,
	updateProject,
	deleteProject,
}
