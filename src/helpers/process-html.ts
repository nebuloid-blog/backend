import grayMatter from 'gray-matter'
import {rehype} from 'rehype'
import rehypeParse from 'rehype-parse'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeSanitize, {defaultSchema} from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import toml from 'toml'
import type {ArticleDbObject} from '@app/types/generated/schema'

// Helper functions for reading/validating html + toml frontmatter,
//  and transforming it into a valid string via rehype + gray matter.
const validateString = (string: unknown) => {
	if (typeof string === 'string') return string
	else return null
}

const sanitizeHTML = async (html: string) => {
	// Classes shall not be removed from the HTML.
	const schema = {
		...defaultSchema,
		attributes: {
			...defaultSchema.attributes,
			'*': [
				...(defaultSchema.attributes?.['*'] ?? []),
				'className',
			],
		},
		tagNames: [
			...(defaultSchema.tagNames ?? []),
			'address',
			'article',
			'aside',
			'footer',
			'header',
			'nav',
			'section',
			'menu',
			'data',
			'u',
			'audio',
			'img',
			'track',
			'video',
			'picture',
			'source',
			'noscript',
			'col',
			'colgroup',
		],
	}

	// Parse the HTML accordingly, using these plugins.
	const vFile = await rehype( )
	.use(rehypeParse, {fragment: true})
	.use(rehypeSanitize, schema)
	.use(rehypePresetMinify)
	.use(rehypeStringify)
	.process(html)

	return vFile
}

const processHTML = async (fileText: string) => {
	// Step 1: Process our Front Matter data.
	const options = {
		delimiters: '~~~',
		engines: {TOML: toml.parse.bind(toml)},
	}

	const {
		data: frontMatter,
		content: rawHTML,
	} = grayMatter(fileText, options)

	const title = validateString(frontMatter.title)
	if (title == null) return null

	const slug = validateString(frontMatter.slug)
	if (slug == null) return null

	// Step 2: Sanitize the actual HTML data.
	const vFile = await sanitizeHTML(rawHTML)
	const sanitizedHTML = vFile.toString( )

	const data: ArticleDbObject = {
		html: sanitizedHTML,
		data: {
			title,
			slug,
		},
	}

	return data
}

export {processHTML}
