import {getArticle, indexArticles} from './articles.js'
import {getCourse, indexCourses} from './courses.js'
import {getProject, indexProjects} from './projects.js'
import {getMe} from './users.js'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema.js'

export const Queries: Resolvers = {
	// Articles
	getArticle,
	indexArticles,

	// Users
	getMe,

	// Courses
	getCourse,
	indexCourses,

	// Projects
	getProject,
	indexProjects,
}
