import {RefreshTokens} from '@app/models'
import {UserDbObject} from '@app/types/generated/schema'
import {ClientSession} from 'mongoose'
import {signAccessToken, signRefreshToken} from './sign-jwt'
import type {CookieStore} from '@whatwg-node/cookie-store'

// Max age is 5 days on the backend.
const MAX_COOKIE_AGE_IN_SECONDS = 1000 * 60 * 60 * 24 * 5
//                                ms.    min. hour day

/**
This function first creates a new refresh token in the
	database, but then also signs a pair of tokens to return.
**/
const generateTokens = async (
	user: UserDbObject,
	cookieStore: CookieStore | undefined,
	session?: ClientSession,
) => {
	const userId = user._id.toString( )

	// Create a new refresh token in the database.
	// Conditionally use the given params
	//  to give back the correct function call.
	let refreshTokenDoc
	if (session == null) {
		refreshTokenDoc = await RefreshTokens.create(
			{owner: userId},
		)
	}
	else {
		[refreshTokenDoc] = await RefreshTokens.create(
			[{owner: userId}],
			{session},
		)
	}

	// Sign the access and refresh tokens.
	const refreshTokenId = refreshTokenDoc._id.toString( )
	const refreshToken = signRefreshToken(refreshTokenId)
	const accessToken = signAccessToken(user)

	// Save the refresh token to a http-only cookie.
	if (cookieStore == null) throw new Error('No cookies to set!')

	await cookieStore.set({
		name: 'refreshToken',
		value: refreshToken,
		expires: Date.now( ) + MAX_COOKIE_AGE_IN_SECONDS,
		domain: null,
		sameSite: 'lax', // 'none' | 'lax' | 'strict'

		// TODO: Temporary / insecure
		httpOnly: true,
		secure: false,
	})

	// Return the access token to the backend system.
	return accessToken
}

export {
	generateTokens,
}
