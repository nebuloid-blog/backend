import jwt from 'jsonwebtoken'
import {env} from './secrets'
import type {UserDbObject} from '@app/types/generated/schema'

// Centralize the jwt.sign() method here to maintain defaults.
const signJWT = (payload: UserDbObject | null) => {
	if (payload == null) return null

	const token = jwt.sign(
		{user: payload},
		env.JWT_SECRET,
		{expiresIn: '3d'},
	)
	return token
}

export {signJWT}
