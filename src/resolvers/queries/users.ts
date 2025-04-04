import {findUserLoginById} from '@helpers/verify-resources'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema'

const getMe: Resolvers['getMe'] = async (
	parent,
	args,
	context,
) => {
	console.info({
		parent,
		args,
		context,
	})

	console.info({
		data: context?.params?.variables?.userId,
	})

	const currentUser = await findUserLoginById(context?.params?.variables?.userId)
	return currentUser
}

export {
	getMe,
}
