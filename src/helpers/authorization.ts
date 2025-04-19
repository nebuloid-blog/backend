import {Role} from '@app/types/generated/schema'
import HttpError from 'standard-http-error'
import type {UserDbObject} from '@app/types/generated/schema'

const authorizationError = new HttpError(
	403, // FORBIDDEN
	'Insufficient permissions to make this request.',
)

const roleAccessLevels = [
	Role.GUEST,
	Role.USER,
	Role.MODERATOR,
	Role.ADMINISTRATOR,
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
) => {
	if (user != null && user._id.toString( ) === ownerID) return true
	else throw authorizationError
}

const authorizeRoleAccess = async (
	user: UserDbObject | undefined,
	requiredRole: Role,
) => {
	const userRole = refineRole(user?.role)
	const userAccessLevel = roleAccessLevels.indexOf(userRole)
	const requiredAccessLevel = roleAccessLevels.indexOf(requiredRole)

	if (userAccessLevel >= requiredAccessLevel) return true
	else throw authorizationError
}

export {
	authorizeOwnership,
	authorizeRoleAccess,
}
