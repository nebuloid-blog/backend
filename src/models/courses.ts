import {Schema, model} from 'mongoose'

const CourseSchema = new Schema({
	name: {type: String, required: true},
	description: {type: String},
	projects: [{ref: 'Project', type: Schema.Types.ObjectId}],
})

export const Courses = model('Course', CourseSchema)
