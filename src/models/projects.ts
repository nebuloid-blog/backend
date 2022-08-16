import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	courses: [{ref: 'Course', type: mongoose.Schema.Types.ObjectId}],
})

export const Projects = mongoose.model('Project', ProjectSchema)
