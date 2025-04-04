import {findUserLoginById} from '@helpers/verify-resources'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema'

const getMe: Resolvers['getMe'] = async (
	parent,
	args,
	context,
) => {
	// Extract variables from context.
	const {variables} = context.params

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(variables?.userId)
	return currentUser
}

export {
	getMe,
}
