import type {YogaInitialContext, GraphQLParams} from 'graphql-yoga'
import type {JwtPayload} from 'jsonwebtoken'

interface Payload extends JwtPayload {
	userId: string,
	username: string,
	role: string,
}

interface Context extends YogaInitialContext {
	params: GraphQLParams<Payload>,
}

export type {Context, Payload}
