/* eslint-disable no-tabs */
import type {Blob, Commit, Repository, TreeEntry} from '@octokit/graphql-schema'
import {isFilled} from 'ts-is-present'
import {graphqlWithAuth} from '../helpers/github-api-authenticator.js'
import {gqlGetArticle, gqlIndexArticles} from '../helpers/github-queries.js'
import {parseMarkdown} from '../helpers/parse-markdown.js'
import {Courses, Projects} from '../models.js'
import type {QueryResolvers as Resolvers} from '../types/generated/schema.js'

/* ARTICLES */
const getArticle: Resolvers['getArticle'] = async (parent, args) => {
	// Step 1: Create the query.
	const query = gqlGetArticle
	const branch = args.branch ?? 'main'
	const filePath = `articles/${args.file}`
	const fileExpression = `${branch}:${filePath}`

	// Step 2: Call the query with some type-helpers.
	interface GitHubResponse {
		repository:
			& Repository
			& {object?: Blob}
			& {ref?: Commit},
	}

	const response = await graphqlWithAuth<GitHubResponse>({
		query,
		branch,
		filePath,
		fileExpression,
	})

	// Step 3: Clean the response and return the data.
	const markdown = response.repository.object?.text
	if (markdown == null) return null
	else return await parseMarkdown(markdown)
}

const indexArticles: Resolvers['indexArticles'] = async (parent, args) => {
	// Step 1: Create the query.
	const query = gqlIndexArticles
	const branch = args.branch ?? 'main'
	const dirExpression = `${branch}:articles/`

	// Step 2: Call the query with some type-helpers.
	interface GitHubResponse {
		repository:
		& Repository
		& {
			object?: {
				entries?: Array<
					& TreeEntry
					& {object?: Blob}
				>,
			},
		},
	}

	// Step 3: Clean the response data into good form.
	const response = await graphqlWithAuth<GitHubResponse>({
		query,
		dirExpression,
	})

	const entries = response.repository.object?.entries ?? []
	const promisedArticles = entries.map(async (entry) => {
		const markdown = entry.object?.text
		if (markdown == null) return null
		else return await parseMarkdown(markdown)
	})

	// Step 4: Resolve all promises and remove all nullish values.
	const resolvedArticles = await Promise.all(promisedArticles)
	const articles = resolvedArticles.filter(isFilled)
	if (articles.length === 0) return null
	else return articles
}

/* USERS */
const getMe: Resolvers['getMe'] = (parent, args, context) => (
	context.user ?? null
)

/* COURSES */
const getCourse: Resolvers['getCourse'] = async (parent, args) => (
	await Courses.findOne({id: args.id}) ?? null
)

const indexCourses: Resolvers['indexCourses'] = async (parent, args) => (
	await Courses.find({ })
)

/* PROJECTS */
const getProject: Resolvers['getProject'] = async (parent, args) => (
	await Projects.findOne({id: args.id}) ?? null
)

const indexProjects: Resolvers['indexProjects'] = async (parent, args) => (
	await Projects.find({ })
)

export const Query: Resolvers = {
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
