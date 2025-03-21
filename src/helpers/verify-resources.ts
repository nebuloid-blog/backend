import {Users} from '@app/models'
import HttpError from 'standard-http-error'

const userNotAuthorized = new HttpError(
	401, // UNAUTHORIZED
	'User authentication required.',
)

const loginNotFound = new HttpError(
	404, // NOT FOUND
	'Can\'t find logged in user.',
)

const userNotFound = new HttpError(
	404, // NOT FOUND
	'Can\'t find target user.',
)

/**
Leverages the mongoose `.findById` method, but throws if
	no matching user is found in the database.
**/
const findUserById = async (
	userId: string | undefined,
) => {
	// Determine user data by finding the user by their id.
	const user = await Users.findById(userId)
	if (user == null) throw userNotFound
	return user
}

/**
Leverages the mongoose `.findById` method, but throws if
	no matching user is found in the database.
The error messages in this one differentiate it from the
	`findUserById` helper function.
This assumes the parameter is the ID of the logged in user.
**/
const findUserLoginById = async (
	userId: string | undefined,
) => {
	// Ensure user is "logged in" based on given string.
	if (userId == null) throw userNotAuthorized

	// Determine user data by finding the user by their id.
	const user = await Users.findById(userId)
	if (user == null) throw loginNotFound
	return user
}

export {
	findUserById,
	findUserLoginById,
}
