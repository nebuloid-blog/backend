import {Role} from '../types/generated/schema.js'
import type {UserDbObject} from '../types/generated/schema.js'

const authorizationError = new Error('You don\'t have permission to make this request.')

const roleAccessLevels = [
	Role.GUEST,
	Role.USER,
	Role.OWNER,
]

// Stupid work-around for filtering typescript enums...
const refineRole = (role: string | undefined): Role => {
	if (role == null) return Role.GUEST

	const refinedRole = roleAccessLevels.find((level) => level === role)
	if (refinedRole == null) {
		// This condition may occur if an invalid role was provided somehow.
		console.warn('An invalid role was provided. Falling back to "GUEST".')
		return Role.GUEST
	}
	else {
		return refinedRole
	}
}

// These authorization functions are asyncronous.
// Their errors are intended to be handled by another async function.
const authorizeOwnership = async (
	user: UserDbObject | undefined,
	ownerID: string,
	throwErrorOnFailure = true,
) => {
	if (user != null && user._id.toString( ) === ownerID) return true
	else if (throwErrorOnFailure) throw authorizationError
	else return false
}

const authorizeRoleAccess = async (
	user: UserDbObject | undefined,
	requiredRole: Role,
	throwErrorOnFailure = true,
) => {
	const userRole = refineRole(user?.role)
	const userAccessLevel = roleAccessLevels.indexOf(userRole)
	const requiredAccessLevel = roleAccessLevels.indexOf(requiredRole)

	if (userAccessLevel >= requiredAccessLevel) return true
	else if (throwErrorOnFailure) throw authorizationError
	else return false
}

export {
	// Variables
	authorizationError,

	// Functions
	authorizeOwnership,
	authorizeRoleAccess,
}
