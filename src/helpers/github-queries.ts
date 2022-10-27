// GraphQL Query for "getArticle"
const gqlGetArticle = /* GraphQL */ `
	query GetArticle(
		$branch: String = "main",
		$filePath: String!,
		$fileExpression: String!,
		$showHistory: Boolean = false,
	) {
		repository(owner: "nebuloid-blog", name: "articles") {
			# Get the file's text contents
			object(expression: $fileExpression) {
				... on Blob {
					text
				}
			}

			# Get file's history
			ref(qualifiedName: $branch) @include(if: $showHistory) {
				target {
					... on Commit {
						history(path: $filePath) {
							nodes {
								pushedDate
								messageHeadline
								messageBody
							}
						}
					}
				}
			}
		}
	}
`

// GraphQL Query for "indexArticles"
const gqlIndexArticles = /* GraphQL */ `
	query IndexArticles($dirExpression: String!) {
		repository(owner: "nebuloid-blog", name: "articles") {
			object(expression: $dirExpression) {
				... on Tree {
					entries {
						# Get each file's text contents
						object {
							... on Blob {
								text
							}
						}
					}
				}
			}
		}
	}
`

export {
	gqlGetArticle,
	gqlIndexArticles,
}
