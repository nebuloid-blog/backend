import {Courses} from '@app/models'
import type {QueryResolvers as Resolvers} from '@app/types/generated/schema'

const getCourse: Resolvers['getCourse'] = async (
	parent,
	args,
	context,
) => (
	await Courses.findOne({id: args.id}) ?? null
)

const indexCourses: Resolvers['indexCourses'] = async (
	parent,
	args,
	context,
) => (
	await Courses.find({ })
)

export {
	getCourse,
	indexCourses,
}
