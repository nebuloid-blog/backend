import type {QueryResolvers as Resolvers} from '@app/types/generated/schema.js'

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
