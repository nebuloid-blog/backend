import {createAppAuth} from '@octokit/auth-app'
import {graphql} from '@octokit/graphql'
import type {Query, RequestParameters} from '@octokit/graphql/dist-types/types.js'
import {env} from './secrets.js'

// Octokit will cache security credentials and serve from the GitHub API.
// It automates refreshing tokens, etc, and does so quite intuitively!
const authenticateApp = createAppAuth({
	appId: env.GH_APP_ID,
	privateKey: env.GH_APP_PRIVATE_KEY,
	installationId: env.GH_INSTALLATION_ID,
	clientId: env.GH_CLIENT_ID,
	clientSecret: env.GH_CLIENT_SECRET,
})

// This function takes the authenticator and wraps the graphql client with it.
// The only thing left to do is write some queries, and provide response types.
type GraphQLParams =
	| [options: RequestParameters]
	| [query: Query, parameters?: RequestParameters]

const graphqlWithAuth = async <ResponseData>(...params: GraphQLParams) => {
	// Authenticate installation instance.
	const installation = await authenticateApp({type: 'installation'})

	// Create a graphql client instance with new defaults.
	const graphqlWithAuth = graphql.defaults(
		{headers: {authorization: `token ${installation.token}`}},
	)

	// Use the client with new defaults, checking overload signatures.
	if (typeof params[0] === 'string') {
		// Overload 1: the query-string found in first parameter.
		const [query, parameters] = params
		return await graphqlWithAuth<ResponseData>(query, parameters)
	}
	else {
		// Overload 2: the query-string is nested in an object.
		const [options] = params
		return await graphqlWithAuth<ResponseData>(options)
	}
}

export {graphqlWithAuth}
