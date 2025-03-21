import type {JwtPayload} from 'jsonwebtoken'

interface Payload extends Record<string, unknown>, JwtPayload {
	userId: string,
	username: string,
	role: string,
}

type Context = Payload | undefined

export type {Context, Payload}
