import type {UserDbObject} from './generated/schema.js'
import type {JwtPayload} from 'jsonwebtoken'

export interface Context extends Record<string, unknown>, JwtPayload {
	user?: UserDbObject,
}
