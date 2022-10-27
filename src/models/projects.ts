import {Schema, model} from 'mongoose'

const ProjectSchema = new Schema({
	name: {type: String, required: true},
	description: {type: String},
	courses: [{ref: 'Course', type: Schema.Types.ObjectId}],
})

export const Projects = model('Project', ProjectSchema)
