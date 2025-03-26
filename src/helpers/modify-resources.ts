import {RefreshTokens} from '@app/models'
import {UserDbObject} from '@app/types/generated/schema'
import {ClientSession} from 'mongoose'
import {signAccessToken, signRefreshToken} from './sign-jwt'

/**
This function first creates a new refresh token in the
	database, but then also signs a pair of tokens to return.
**/
const generateTokens = async (
	user: UserDbObject,
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

	// Return the tokens.
	return {accessToken, refreshToken}
}

export {
	generateTokens,
}
