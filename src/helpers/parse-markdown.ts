import grayMatter from 'gray-matter'
import {remark} from 'remark'
import remarkHTML from 'remark-html'
import toml from 'toml'
import type {ArticleDbObject} from '../types/generated/schema'

// Helper functions for reading markdown + toml frontmatter,
// and transforming it into hypertext via remark + gray matter.
const markdownToHtml = async (markdown: string) => {
	const result = await remark( )
	.use(remarkHTML)
	.process(markdown)

	return result.toString( )
}

const validateString = (string: unknown) => {
	if (typeof string === 'string') return string
	else return null
}

const parseMarkdown = async (fileText: string) => {
	const options = {
		delimiters: '~~~',
		engines: {TOML: toml.parse.bind(toml)},
	}

	const parsed = grayMatter(fileText, options)
	const hypertext = await markdownToHtml(parsed.content)

	const title = validateString(parsed.data.title)
	if (title == null) return null

	const slug = validateString(parsed.data.slug)
	if (slug == null) return null

	const data: ArticleDbObject = {
		contents: fileText,
		markdown: parsed.content,
		html: hypertext,
		title: title,
		slug: slug,
	}

	return data
}

export {parseMarkdown}
