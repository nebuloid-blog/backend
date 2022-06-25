import mongoose from 'mongoose'
import type {CourseDbObject, ProjectDbObject} from './generated/types.js'

const {Types} = mongoose

const algoId = new Types.ObjectId( )
const herdId = new Types.ObjectId( )

const courses: Array<CourseDbObject> = [
	{
		_id: new Types.ObjectId( ),
		name: 'Backend Web 2.0: RESTful Architecture',
		description: 'Did some amazing stuff with servers!',
	},
	{
		_id: algoId,
		name: 'Data Structures & Algorithms',
		projects: [herdId],
	},
]

const projects: Array<ProjectDbObject> = [
	{
		_id: new Types.ObjectId( ),
		name: 'Suprez',
		description: 'Suprise Presentations!',
	},
	{
		_id: new Types.ObjectId( ),
		name: 'Maze Generator',
	},
	{
		_id: herdId,
		name: 'Herd Immunity',
		description: 'Python project for DS & Algo',
		courses: [algoId],
	},
]

export const rootValue = {
	courses,
	projects,
}
