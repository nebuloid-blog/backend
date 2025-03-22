import {Payload} from '@app/types/context'
import jwt from 'jsonwebtoken'
import {env} from './secrets'
import type {UserDbObject} from '@app/types/generated/schema'

// Centralize the jwt.sign() method here to maintain defaults.
const signJWT = (user: UserDbObject | null) => {
	if (user == null) return null

	const payload: Payload = {
		userId: user._id.toString( ),
		username: user.username,
		role: user.role,
	}

	const token = jwt.sign(
		payload,
		env.JWT_SECRET,
		{expiresIn: '3d'},
	)

	return token
}

export {signJWT}
