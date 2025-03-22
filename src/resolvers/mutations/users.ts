import {Users} from '@app/models'
import {Role} from '@app/types/generated/schema'
import {authenticateUser} from '@helpers/authentication'
import {authorizeRoleAccess, authorizeOwnership} from '@helpers/authorization'
import {signJWT} from '@helpers/sign-jwt'
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
	await authenticateUser(args.username, args.password)
	const user = await Users.findOne({username: args.username})

	return signJWT(user)
}

const deleteUser: Resolvers['deleteUser'] = async (
	parent,
	args,
	context,
) => {
	await Promise.any([
		authorizeOwnership(context.user, args.id),
		authorizeRoleAccess(context.user, Role.OWNER),
	])

	const user = await Users.deleteOne({_id: args.id})
	return user.acknowledged
}

export {
	createUser,
	signInUser,
	deleteUser,
}
