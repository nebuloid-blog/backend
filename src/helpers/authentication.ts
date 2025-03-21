import {Users} from '@app/models'
import bcrypt from 'bcrypt'
import HttpError from 'standard-http-error'

const authenticationError = new HttpError(
	401, // UNAUTHORIZED
	'Incorrect username or password.',
)

const authenticateUser = async (
	username: string,
	password: string,
) => {
	// Verify user exists & look up password hash.
	const user = await Users.findOne({username})
	if (user == null) throw authenticationError

	// Compare provided password with the hash.
	const passwordIsValid = await bcrypt.compare(password, user.password)
	if (!passwordIsValid) throw authenticationError

	// Indicates a successful authentication / login / etc.
	return user
}

export {
	authenticateUser,
}
