import type {UserResolvers as Resolvers} from '@app/types/generated/schema'

const id: Resolvers['id'] = (user) => (
	user._id.toString( )
)

const email: Resolvers['email'] = (user) => (
	user.email
)

const username: Resolvers['username'] = (user) => (
	user.username
)

export const User: Resolvers = {
	id,
	email,
	username,
}
