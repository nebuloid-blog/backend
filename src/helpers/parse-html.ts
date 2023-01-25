import grayMatter from 'gray-matter'
import {rehype} from 'rehype'
import rehypeParse from 'rehype-parse'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import toml from 'toml'
import type {ArticleDbObject} from '../types/generated/schema'

// Helper functions for reading/validating html + toml frontmatter,
//  and transforming it into a valid string via rehype + gray matter.
const validateString = (string: unknown) => {
	if (typeof string === 'string') return string
	else return null
}

const validateHTML = async (html: string) => {
	const result = await rehype( )
	.use(rehypeParse, {fragment: true})
	.use(rehypeSanitize)
	.use(rehypePresetMinify)
	.use(rehypeStringify)
	.process(html)

	return result
}

const parseHTML = async (fileText: string) => {
	const options = {
		delimiters: '~~~',
		engines: {TOML: toml.parse.bind(toml)},
	}

	const {
		data: frontMatter,
		content: rawHTML,
	} = grayMatter(fileText, options)

	const vFile = await validateHTML(rawHTML)
	const sanitizedHTML = vFile.toString( )

	const title = validateString(frontMatter.title)
	if (title == null) return null

	const slug = validateString(frontMatter.slug)
	if (slug == null) return null

	const data: ArticleDbObject = {
		html: sanitizedHTML,
		data: {
			title,
			slug,
		},
	}

	return data
}

export {parseHTML}
