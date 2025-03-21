import type {QueryResolvers as Resolvers} from '@app/types/generated/schema'

const getMe: Resolvers['getMe'] = (
	parent,
	args,
	context,
) => (
	context.user ?? null
)

export {
	getMe,
}
