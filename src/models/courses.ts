import type {Types} from 'mongoose'
import {Schema, model} from 'mongoose'

interface CourseRecord {
	name: string,
	description?: string,
	projects?: Array<Types.ObjectId>,
}

const CourseSchema: Schema<CourseRecord> = new Schema({
	name: {type: String, required: true},
	description: {type: String},
	projects: [{ref: 'Project', type: Schema.Types.ObjectId}],
})

export const Courses = model('Course', CourseSchema)
