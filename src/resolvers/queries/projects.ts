import {Projects} from '@app/models/index.js'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema.js'

const getProject: Resolvers['getProject'] = async (
	parent,
	args,
	context,
) => (
	await Projects.findOne({id: args.id}) ?? null
)

const indexProjects: Resolvers['indexProjects'] = async (
	parent,
	args,
	context,
) => (
	await Projects.find({ })
)

export {
	getProject,
	indexProjects,
}
