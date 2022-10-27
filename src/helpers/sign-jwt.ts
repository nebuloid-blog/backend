import jwt from 'jsonwebtoken'
import type {UserDbObject} from '../types/generated/schema.js'
import {env} from './secrets.js'

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
