import {Schema, model} from 'mongoose'

const RefreshTokenSchema = new Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
})

export const RefreshTokens = model('RefreshToken', RefreshTokenSchema)
