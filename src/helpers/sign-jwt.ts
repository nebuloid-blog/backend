import jwt, {JwtPayload} from 'jsonwebtoken'
import {env} from './secrets'
import {ORIGIN_URL} from './variables'
import type {Payload} from '@app/types/context'
import type {UserDbObject} from '@app/types/generated/schema'

const malformedJWT = new Error(
	'JWT was read successfully, but was malformed.',
)

const signAccessToken = (user: UserDbObject) => {
	// The access token's additional payload is a convenience.
	// It merely contains non-essential user metadata.
	const payload: Payload = {
		userId: user._id.toString( ),
		username: user.username,
		role: user.role,
	}

	// Access tokens have a short lifetime to reduce
	//  security risks if compromised.
	const lifetime = '15 minutes'

	// Sign the JWT accordingly.
	const token = jwt.sign(
		payload,
		env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: lifetime,
			audience: 'nebuloid-backend',
			issuer: ORIGIN_URL,
		},
	)

	// Return the signed JWT.
	return token
}

const signRefreshToken = (refreshTokenId: string) => {
	// The refresh token's payload stores a database ID,
	//  enabling secure token revocation and rotation.
	const payload = {refreshTokenId}

	// Refresh tokens last longer to allow session
	//  persistence without requiring frequent logins.
	const lifetime = '5 days'

	// Sign the JWT accordingly.
	const token = jwt.sign(
		payload,
		env.REFRESH_TOKEN_SECRET,
		{expiresIn: lifetime},
	)

	// Return the signed JWT.
	return token
}

const verifyAccessToken = (accessToken: string) => {
	// Verify given signed access token string.
	const verified = jwt.verify(
		accessToken,
		env.ACCESS_TOKEN_SECRET,
		{
			audience: 'nebuloid-backend',
			issuer: ORIGIN_URL,
		},
	)

	if (typeof verified === 'string') {
		// The contents of the JWT aren't what we expected.
		// Throw an error in this strange case.
		throw malformedJWT
	}

	return verified as Payload
}

const verifyRefreshToken = (refreshToken: string) => {
	// Verify given signed refresh token string.
	const verified = jwt.verify(
		refreshToken,
		env.REFRESH_TOKEN_SECRET,
	)

	if (typeof verified === 'string') {
		// The contents of the JWT aren't what we expected.
		// Throw an error in this strange case.
		throw malformedJWT
	}

	return verified as JwtPayload & {refreshTokenId: string}
}

export {
	signAccessToken,
	signRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
}
