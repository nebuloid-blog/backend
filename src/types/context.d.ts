import type {YogaInitialContext} from 'graphql-yoga'
import type {JwtPayload} from 'jsonwebtoken'

interface Payload extends JwtPayload {
	userId: string,
	username: string,
	role: string,
}

interface Token {
	prefix: string,
	value: string,
}

interface Context extends YogaInitialContext {
	jwt?: {
		payload: Payload,
		token: Token,
	},
}

export type {Context, Payload}
