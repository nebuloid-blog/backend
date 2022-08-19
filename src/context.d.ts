import type {JwtPayload} from 'jsonwebtoken'
import type {UserDbObject} from './generated/types.js'

export interface Context extends Record<string, unknown>, JwtPayload {
	user?: UserDbObject,
}
