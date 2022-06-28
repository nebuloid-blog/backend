interface CourseModel {
	id: string,
	name: string,
	description?: string,
	projects?: [ProjectModel['id']],
}

interface ProjectModel {
	id: string,
	name: string,
	description?: string,
	courses?: [CourseModel['id']],
}

export type {
	CourseModel,
	ProjectModel,
}
