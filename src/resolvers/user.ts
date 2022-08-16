import type {UserResolvers} from '../generated/types.js'

const id: UserResolvers['id'] = (user) => (
	user._id.toString( )
)

const email: UserResolvers['email'] = (user) => (
	user.email
)

const username: UserResolvers['username'] = (user) => (
	user.username
)

export const User: UserResolvers = {
	id,
	email,
	username,
}
