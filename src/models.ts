interface CourseModel {
	_id: string,
	name: string,
	description?: string,
	projects?: [ProjectModel['_id']],
}

interface ProjectModel {
	_id: string,
	name: string,
	description?: string,
	courses?: [CourseModel['_id']],
}

export type {
	CourseModel,
	ProjectModel,
}
