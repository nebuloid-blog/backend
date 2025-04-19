import {RefreshTokens} from '@app/models'
import {UserDbObject} from '@app/types/generated/schema'
import {env} from '@helpers/secrets'

import {
	signAccessToken,
	signRefreshToken,
} from '@helpers/sign-jwt'

import {MAX_COOKIE_AGE_IN_SECONDS} from '@helpers/variables'
import {ClientSession} from 'mongoose'
import type {CookieListItem, CookieStore} from '@whatwg-node/cookie-store'

const {NODE_ENV} = env

type CookieEnvSettings = Pick<CookieListItem, 'secure' | 'domain' | 'sameSite'>

const getCookieEnvSettings = ( ): CookieEnvSettings => {
	switch (NODE_ENV) {
		default:
		case ('production'): {
			return {
				// Allows cookies to be shared across subdomains.
				//   (e.g., nebuloid.dev and api.nebuloid.dev)
				domain: '.nebuloid.dev',

				// Enables cross-origin requests.
				//   (e.g., nebuloid.dev accessing api.nebuloid.dev)
				sameSite: 'none',

				// Cookies are only sent over HTTPS.
				//   (required for sameSite: 'none')
				secure: true,
			}
		}

		case ('development'): {
			return {
				// With `null` no domain is specified,
				//   so cookies are only valid for localhost.
				domain: null,

				// This `strict` setting ensures cookies are
				//   only sent for same-origin requests.
				sameSite: 'strict',

				// Cookies can be sent over HTTP.
				//   (required on http://localhost:3000/)
				secure: false,

			}
		}
	}
}

const COOKIE_SETTINGS = getCookieEnvSettings( )

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
	const accessToken = signAccessToken(user)
	const refreshToken = signRefreshToken(refreshTokenId)

	// Save the refresh token to a http-only cookie.
	if (cookieStore == null) throw new Error('No cookies to set!')

	await cookieStore.set({
		name: 'refreshToken',
		value: refreshToken,
		expires: Date.now( ) + MAX_COOKIE_AGE_IN_SECONDS,
		httpOnly: true,
		...COOKIE_SETTINGS,
	})

	// Return the access token to the backend system.
	return accessToken
}

export {
	generateTokens,
}
