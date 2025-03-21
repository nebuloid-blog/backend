import {Role} from '@app/types/generated/schema'
import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	role: {type: String, enum: Role, default: Role.USER, required: true},
})

export const Users = model('User', UserSchema)
