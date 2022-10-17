import type {Types} from 'mongoose'
import {Schema, model} from 'mongoose'

interface ProjectRecord {
	name: string,
	description?: string,
	courses?: Array<Types.ObjectId>,
}

const ProjectSchema: Schema<ProjectRecord> = new Schema({
	name: {type: String, required: true},
	description: {type: String},
	courses: [{ref: 'Course', type: Schema.Types.ObjectId}],
})

export const Projects = model('Project', ProjectSchema)
