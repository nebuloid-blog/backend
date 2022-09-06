import mongoose from 'mongoose'
import {Role} from '../types/generated/schema.js'

const UserSchema = new mongoose.Schema({
	email: {type: String, required: true, index: {unique: true}},
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	role: {type: String, enum: Role, default: Role.USER, required: true},
})

export const Users = mongoose.model('User', UserSchema)
