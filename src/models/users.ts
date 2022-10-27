import {Schema, model} from 'mongoose'
import {Role} from '../types/generated/schema.js'

const UserSchema = new Schema({
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	role: {type: String, enum: Role, default: Role.USER, required: true},
})

export const Users = model('User', UserSchema)
