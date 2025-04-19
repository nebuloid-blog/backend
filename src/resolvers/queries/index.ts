import {getArticle, indexArticles} from './articles'
import {getCourse, indexCourses} from './courses'
import {getProject, indexProjects} from './projects'
import {getMe} from './users'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema'

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
