import {graphqlWithAuth} from '@helpers/github-api-authenticator.js'
import {gqlGetArticle, gqlIndexArticles} from '@helpers/github-queries.js'
import {processHTML} from '@helpers/process-html.js'
import {isFilled} from 'ts-is-present'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema.js'
import type {Blob, Commit, Repository, TreeEntry} from '@octokit/graphql-schema'

/* ARTICLES */
const getArticle: Resolvers['getArticle'] = async (
	parent,
	args,
	context,
) => {
	// Step 1: Create the query.
	const query = gqlGetArticle
	const branch = args.branch ?? 'main'
	const directory = args.directory ?? 'articles'
	const filePath = `${directory}/${args.file}`
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
	const html = response.repository.object?.text
	if (html == null) return null
	else return await processHTML(html)
}

const indexArticles: Resolvers['indexArticles'] = async (
	parent,
	args,
	context,
) => {
	// Step 1: Create the query.
	const query = gqlIndexArticles
	const branch = args.branch ?? 'main'
	const directory = args.directory ?? 'articles'
	const dirExpression = `${branch}:${directory}/`

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
		const html = entry.object?.text
		if (html == null) return null
		else return await processHTML(html)
	})

	// Step 4: Resolve all promises and remove all nullish values.
	const resolvedArticles = await Promise.all(promisedArticles)
	const articles = resolvedArticles.filter(isFilled)
	if (articles.length === 0) return null
	else return articles
}

export {
	getArticle,
	indexArticles,
}
