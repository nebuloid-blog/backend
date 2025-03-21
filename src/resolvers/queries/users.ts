import {findUserLoginById} from '@helpers/verify-resources'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema'

const getMe: Resolvers['getMe'] = async (
	parent,
	args,
	context,
) => {
	const currentUser = await findUserLoginById(context?.userId)
	return currentUser
}

export {
	getMe,
}
