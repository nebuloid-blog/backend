import type {CourseModel, ProjectModel} from './models.js'

const courses: Array<CourseModel> = [
	{
		id: '5',
		name: 'Backend Web 2.0: RESTful Architecture',
		description: 'Did some amazing stuff with servers!',
	},
	{
		id: '6',
		name: 'Data Structures & Algorithms',
		projects: ['3'],
	},
]

const projects: Array<ProjectModel> = [
	{
		id: '1',
		name: 'Suprez',
		description: 'Suprise Presentations!',
	},
	{
		id: '2',
		name: 'Maze Generator',
	},
	{
		id: '3',
		name: 'Herd Immunity',
		description: 'Python project for DS & Algo',
		courses: ['1'],
	},
]

export const rootValue = {
	courses,
	projects,
}
