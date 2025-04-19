import {Users, RefreshTokens} from '@app/models'
import HttpError from 'standard-http-error'
import type {CookieStore} from '@whatwg-node/cookie-store'

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

const tokenNotFound = new HttpError(
	404, // NOT FOUND
	'Can\'t find refresh token.',
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

/**
Leverages the mongoose `.findById` method, but throws if
	no matching refresh token is found in the database.
**/
const findRefreshTokenById = async (
	refreshTokenId: string | undefined,
) => {
	// Determine refresh token data by finding it in the db.
	const doc = await RefreshTokens.findById(refreshTokenId)
	if (doc == null) throw tokenNotFound
	return doc
}

const getCookieFromStore = async (
	cookieStore: CookieStore | undefined,
	cookieKey: string,
) => {
	// Get the current refresh token's value from a cookie.
	if (cookieStore == null) throw new Error('No cookie store!')
	const cookie = await cookieStore.get(cookieKey)
	if (cookie == null) throw new Error('No cookie!')

	// Return the result at last!
	const refreshToken = cookie.value
	return refreshToken
}

export {
	findUserById,
	findUserLoginById,
	findRefreshTokenById,
	getCookieFromStore,
}
