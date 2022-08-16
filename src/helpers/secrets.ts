import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import type {UserDbObject} from '../generated/types.js'
import type DotEnv from '../globals.js'

// Load environmental variables with dotenv.
dotenv.config( )

// Generally I don't like global variables.
// We'll abstract our env into an importable var here.
const env: DotEnv = process.env

// Out of brevity/laziness, centralize the jwt.sign() method here.
const {JWT_SECRET} = env
const signJWT = (payload: UserDbObject) => {
	const token = jwt.sign(
		{user: payload},
		JWT_SECRET,
		{expiresIn: '3d'},
	)
	return token
}

export {
	env,
	signJWT,
}
