import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	email: {type: String, required: true, index: {unique: true}},
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
})

export const Users = mongoose.model('User', UserSchema)
