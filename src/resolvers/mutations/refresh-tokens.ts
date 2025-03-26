import HttpError from 'standard-http-error'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema'

const notImplemented = new HttpError(
	501, // NOT IMPLEMENTED
	'Route not implemented.',
)

const replaceRefreshToken: Resolvers['replaceRefreshToken'] = async (
	parent,
	args,
	context,
) => {
	throw notImplemented
}

const revokeRefreshToken: Resolvers['revokeRefreshToken'] = async (
	parent,
	args,
	context,
) => {
	throw notImplemented
}

const revokeAllRefreshTokens: Resolvers['revokeAllRefreshTokens'] = async (
	parent,
	args,
	context,
) => {
	throw notImplemented
}

const revokeAllRefreshTokensGlobal: Resolvers['revokeAllRefreshTokensGlobal'] = async (
	parent,
	args,
	context,
) => {
	throw notImplemented
}


export {
	replaceRefreshToken,
	revokeRefreshToken,
	revokeAllRefreshTokens,
	revokeAllRefreshTokensGlobal,
}
