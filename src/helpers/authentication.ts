import {Users} from '@app/models/index.js'
import bcrypt from 'bcrypt'

interface AuthOptions {
	throwErrorOnFailure?: boolean,
}

const authenticationError = new Error('Incorrect username or password.')

const authenticateUser = async (
	username: string,
	password: string,
	options?: AuthOptions,
): Promise<boolean> => {
	const throwErrorOnFailure = options?.throwErrorOnFailure ?? true

	// Verify user exists & look up password hash.
	const user = await Users.findOne({username})
	if (user == null) {
		if (throwErrorOnFailure) throw authenticationError
		else return false
	}

	// Compare provided password with the hash.
	const passwordIsValid = await bcrypt.compare(password, user.password)
	if (!passwordIsValid) {
		if (throwErrorOnFailure) throw authenticationError
		else return false
	}

	// Indicates a successful authentication / login / etc.
	return true
}

export {
	authenticationError,
	authenticateUser,
}
