import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	projects: [{ref: 'Project', type: mongoose.Schema.Types.ObjectId}],
})

export const Courses = mongoose.model('Course', CourseSchema)
