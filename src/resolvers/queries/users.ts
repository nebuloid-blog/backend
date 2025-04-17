import {findUserLoginById} from '@helpers/verify-resources'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema'

const getMe: Resolvers['getMe'] = async (
	parent,
	args,
	context,
) => {
	// Extract jwt payload from context.
	const payload = context.jwt?.payload

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(payload?.userId)
	return currentUser
}

export {
	getMe,
}
