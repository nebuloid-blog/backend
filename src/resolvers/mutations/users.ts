import {Users} from '@app/models'
import {Role} from '@app/types/generated/schema'
import {authenticateUser} from '@helpers/authentication'
import {authorizeRoleAccess, authorizeOwnership} from '@helpers/authorization'
import {generateTokens} from '@helpers/modify-resources'
import {
	findUserById,
	findUserLoginById,
} from '@helpers/verify-resources'
import bcrypt from 'bcrypt'
import {startSession} from 'mongoose'
import HttpError from 'standard-http-error'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema'

const userNotDeleted = new HttpError(
	404, // NOT FOUND
	'Couldn\'t find the user to delete.',
)

const createUser: Resolvers['createUser'] = async (
	parent,
	args,
	context,
) => {
	// TODO: Sanitize email address
	// TODO: Run multiple database operations in a session.
	const email = args.email.trim( )
	const username = args.username.trim( )
	const hashedPassword = await bcrypt.hash(args.password, 12)

	// Object added for legibility.
	const userData = {
		email: email,
		username: username,
		password: hashedPassword,
	}

	// Start a database session to ensure atomicity.
	const session = await startSession( )

	try {
		const result = await session.withTransaction(async ( ) => {
			// Create a new user in the database.
			const [user] = await Users.create(
				[userData],
				{session},
			)

			// Creates a new refresh token in the database.
			// Also signs & returns an access & refresh token.
			const tokens = await generateTokens(user, session)

			// Return user data.
			return {user, tokens}
		})

		// Return the result from the successful session.
		return result
	}

	finally {
		// Always end the session - success or failure.
		void session.endSession( )
	}
}

const signInUser: Resolvers['signInUser'] = async (
	parent,
	args,
	context,
) => {
	const user = await authenticateUser(args.username, args.password)

	// Create a new refresh token in the database.
	// Then, sign & return an access token + refresh token.
	const tokens = await generateTokens(user)

	// Return user data.
	return {user, tokens}
}

const deleteUser: Resolvers['deleteUser'] = async (
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

	// Delete the target user.
	const deleted = await Users.deleteOne({_id: targetUserId})

	// There was a problem deleting the target user.
	if (deleted.deletedCount === 0) throw userNotDeleted
	else return true // There was no problem - return true.
}

export {
	createUser,
	signInUser,
	deleteUser,
}
