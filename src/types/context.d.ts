import type {YogaInitialContext} from 'graphql-yoga'
import type {JwtPayload} from 'jsonwebtoken'

interface Payload extends JwtPayload {
	userId: string,
	username: string,
	role: string,
}

interface Context extends YogaInitialContext {
	jwt?: Payload,
}

export type {Context, Payload}
