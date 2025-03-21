import {RefreshTokens} from '@app/models'
import {UserDbObject} from '@app/types/generated/schema'
import {signAccessToken, signRefreshToken} from './sign-jwt'

/**
This function first creates a new refresh token in the
	database, but then also signs a pair of tokens to return.
**/
const generateTokens = async (user: UserDbObject) => {
	// Create a new refresh token in the database.
	const userId = user._id.toString( )
	const refreshTokenDoc = await RefreshTokens.create({owner: userId})

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
