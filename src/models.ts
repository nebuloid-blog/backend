import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	projects: [{ref: 'Project', type: mongoose.Schema.Types.ObjectId}],
})

const ProjectSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	courses: [{ref: 'Course', type: mongoose.Schema.Types.ObjectId}],
})

const Courses = mongoose.model('Course', CourseSchema)
const Projects = mongoose.model('Project', ProjectSchema)

export {
	Courses,
	Projects,
}
