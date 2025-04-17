import {RefreshTokens} from '@app/models'
import {Role} from '@app/types/generated/schema'
import {authorizeRoleAccess, authorizeOwnership} from '@helpers/authorization'
import {generateTokens} from '@helpers/modify-resources'
import {verifyRefreshToken} from '@helpers/sign-jwt'
import {
	findUserById,
	findUserLoginById,
	findRefreshTokenById,
	getCookieFromStore,
} from '@helpers/verify-resources'
import {startSession} from 'mongoose'
import HttpError from 'standard-http-error'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema'

const tokenNotDeleted = new HttpError(
	404, // NOT FOUND
	'Couldn\'t find the refresh token to delete.',
)

const replaceRefreshToken: Resolvers['replaceRefreshToken'] = async (
	parent,
	args,
	context,
) => {
	/*
	IMPORTANT NOTE:
	This route -cannot- require an access token, since this is
		the route that gets called in case the access token expires.
	Furthermore, a username and password should not be required:
		this route gets called frequently, and it would hurt the UX.

	Access tokens have a very short lifespan, so its important
		that refresh tokens are both secure and easy to refresh.

	Furthermore, this route is one of the only routes that
		require a secure HTTP cookie payload.
	*/

	// Obtain the refresh token from the cookie store.
	const {cookieStore} = context.request
	const refreshToken = await getCookieFromStore(
		cookieStore,
		'refreshToken',
	)

	// Obtain the current user from the JWT.
	const {refreshTokenId} = verifyRefreshToken(refreshToken)
	const refreshTokenDoc = await findRefreshTokenById(refreshTokenId)
	const currentUserId = refreshTokenDoc.owner._id.toString( )
	const currentUser = await findUserLoginById(currentUserId)

	// Start a database session to ensure atomicity.
	const session = await startSession( )

	try {
		const result = await session.withTransaction(async ( ) => {
			// Delete the token and save to session.
			const deleted = await RefreshTokens.deleteOne(
				{_id: refreshTokenId},
				{session},
			)

			// Create new tokens and save to session.
			const accessToken = await generateTokens(
				currentUser,
				cookieStore,
				session,
			)

			// There was a problem deleting the given token.
			if (deleted.deletedCount === 0) throw tokenNotDeleted

			// Issue a new refresh token and return it.
			return {accessToken}
		})

		// Return the result from the successful session.
		return result
	}

	finally {
		// Always end the session - success or failure.
		session.endSession( )
	}
}

const revokeRefreshToken: Resolvers['revokeRefreshToken'] = async (
	parent,
	args,
	context,
) => {
	// Obtain the various data from the context.
	const {cookieStore} = context.request
	const payload = context.jwt?.payload

	/*
	IMPORTANT NOTE: This route is one of the only routes that
		require a secure HTTP cookie payload.
	*/

	const refreshToken = await getCookieFromStore(
		cookieStore,
		'refreshToken',
	)

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(payload?.userId)
	const {refreshTokenId} = verifyRefreshToken(refreshToken)
	const refreshTokenDoc = await findRefreshTokenById(refreshTokenId)
	const ownerId = refreshTokenDoc.owner._id.toString( )

	// Ensure logged in user is either
	//  (a) an admin or (b) the token's owner.
	await Promise.any([
		authorizeOwnership(currentUser, ownerId),
		authorizeRoleAccess(currentUser, Role.ADMINISTRATOR),
	])

	// Delete the target token.
	const deleted = await RefreshTokens.deleteOne({_id: refreshTokenId})

	// There was a problem deleting the given token.
	if (deleted.deletedCount === 0) throw tokenNotDeleted
	else return true // There was no problem - return true.
}

const revokeAllRefreshTokens: Resolvers['revokeAllRefreshTokens'] = async (
	parent,
	args,
	context,
) => {
	// Extract jwt payload from context.
	const payload = context.jwt?.payload

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(payload?.userId)
	const targetUser = await findUserById(args.userId)
	const targetUserId = targetUser._id.toString( )

	// Ensure logged in user is either
	//  (a) an admin or (b) the target user.
	await Promise.any([
		authorizeOwnership(currentUser, targetUserId),
		authorizeRoleAccess(currentUser, Role.ADMINISTRATOR),
	])

	// Delete all tokens owned by the target user.
	const deleted = await RefreshTokens.deleteMany({owner: targetUserId})
	return deleted.deletedCount > 0
}

const revokeAllRefreshTokensGlobal: Resolvers['revokeAllRefreshTokensGlobal'] = async (
	parent,
	args,
	context,
) => {
	// Extract jwt payload from context.
	const payload = context.jwt?.payload

	// Obtain user data / ensure user is logged in.
	const currentUser = await findUserLoginById(payload?.userId)

	// Ensure logged-in user has the ADMIN role.
	await authorizeRoleAccess(currentUser, Role.ADMINISTRATOR)

	// Delete all refresh tokens from the database.
	const deleted = await RefreshTokens.deleteMany( )
	return deleted.deletedCount > 0
}

export {
	replaceRefreshToken,
	revokeRefreshToken,
	revokeAllRefreshTokens,
	revokeAllRefreshTokensGlobal,
}
