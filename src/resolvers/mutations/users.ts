import {Users} from '@app/models'
import {Role} from '@app/types/generated/schema'
import {authenticateUser} from '@helpers/authentication'
import {authorizeRoleAccess, authorizeOwnership} from '@helpers/authorization'
import {signJWT} from '@helpers/sign-jwt'
import {findUserById, findUserLoginById} from '@helpers/verify-resources'
import bcrypt from 'bcrypt'
import type {MutationResolvers as Resolvers} from '@app/types/generated/schema'

const createUser: Resolvers['createUser'] = async (
	parent,
	args,
	context,
) => {
	const user = await Users.create({
		email: args.email.trim( ),
		username: args.username.trim( ),
		password: await bcrypt.hash(args.password, 12),
	})

	return signJWT(user)
}

const signInUser: Resolvers['signInUser'] = async (
	parent,
	args,
	context,
) => {
	// Check username & password, and get info via username if good-to-go.
	const user = await authenticateUser(args.username, args.password)

	return signJWT(user)
}

const deleteUser: Resolvers['deleteUser'] = async (
	parent,
	args,
	context,
) => {
	const currentUser = await findUserLoginById(context?.userId)
	const targetUser = await findUserById(args.id)
	const targetUserId = targetUser._id.toString( )

	await Promise.any([
		authorizeOwnership(currentUser, targetUserId),
		authorizeRoleAccess(currentUser, Role.OWNER),
	])

	const user = await Users.deleteOne({_id: targetUserId})
	return user.acknowledged
}

export {
	createUser,
	signInUser,
	deleteUser,
}
