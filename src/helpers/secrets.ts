import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import type {UserDbObject} from '../types/generated/schema.js'
import type {DotEnv} from '../types/globals.js'

// Load environmental variables with dotenv.
dotenv.config( )

// Generally I don't like global variables.
// We'll abstract our env into an importable var here.
const env: DotEnv = process.env

// Out of brevity/laziness, centralize the jwt.sign() method here.
const signJWT = (payload: UserDbObject | null) => {
	if (payload == null) return null

	const token = jwt.sign(
		{user: payload},
		env.JWT_SECRET,
		{expiresIn: '3d'},
	)
	return token
}

export {
	env,
	signJWT,
}
