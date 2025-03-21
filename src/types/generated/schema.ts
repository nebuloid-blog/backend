import {GraphQLResolveInfo} from 'graphql'
import {ObjectId} from 'mongodb'
import {Context} from '../context'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {[_ in K]?: never}
export type Incremental<T> = T | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {[P in K]-?: NonNullable<T[P]>}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: {input: string, output: string},
	String: {input: string, output: string},
	Boolean: {input: boolean, output: boolean},
	Int: {input: number, output: number},
	Float: {input: number, output: number},
}

export type Article = {
	__typename?: 'Article',
	data: ArticleData,
	html: Scalars['String']['output'],
}

export type ArticleData = {
	__typename?: 'ArticleData',
	slug: Scalars['String']['output'],
	title: Scalars['String']['output'],
}

export type Course = {
	__typename?: 'Course',
	description?: Maybe<Scalars['String']['output']>,
	id: Scalars['ID']['output'],
	name: Scalars['String']['output'],
	projects?: Maybe<Array<Project>>,
}

export type Mutation = {
	__typename?: 'Mutation',
	createCourse: Scalars['ID']['output'],
	createProject: Scalars['ID']['output'],
	createUser?: Maybe<Scalars['String']['output']>,
	deleteCourse: Scalars['Boolean']['output'],
	deleteProject: Scalars['Boolean']['output'],
	deleteUser: Scalars['Boolean']['output'],
	signInUser?: Maybe<Scalars['String']['output']>,
	updateCourse: Scalars['Boolean']['output'],
	updateProject: Scalars['Boolean']['output'],
}


export type MutationCreateCourseArgs = {
	description?: InputMaybe<Scalars['String']['input']>,
	name: Scalars['String']['input'],
	projects?: InputMaybe<Array<Scalars['ID']['input']>>,
}


export type MutationCreateProjectArgs = {
	courses?: InputMaybe<Array<Scalars['ID']['input']>>,
	description?: InputMaybe<Scalars['String']['input']>,
	name: Scalars['String']['input'],
}


export type MutationCreateUserArgs = {
	email: Scalars['String']['input'],
	password: Scalars['String']['input'],
	role?: InputMaybe<Role>,
	username: Scalars['String']['input'],
}


export type MutationDeleteCourseArgs = {
	id: Scalars['ID']['input'],
}


export type MutationDeleteProjectArgs = {
	id: Scalars['ID']['input'],
}


export type MutationDeleteUserArgs = {
	id: Scalars['ID']['input'],
}


export type MutationSignInUserArgs = {
	password: Scalars['String']['input'],
	username: Scalars['String']['input'],
}


export type MutationUpdateCourseArgs = {
	id: Scalars['ID']['input'],
}


export type MutationUpdateProjectArgs = {
	id: Scalars['ID']['input'],
}

export type Project = {
	__typename?: 'Project',
	courses?: Maybe<Array<Course>>,
	description?: Maybe<Scalars['String']['output']>,
	id: Scalars['ID']['output'],
	name: Scalars['String']['output'],
}

export type Query = {
	__typename?: 'Query',
	getArticle?: Maybe<Article>,
	getCourse?: Maybe<Course>,
	getMe?: Maybe<User>,
	getProject?: Maybe<Project>,
	indexArticles?: Maybe<Array<Article>>,
	indexCourses?: Maybe<Array<Course>>,
	indexProjects?: Maybe<Array<Project>>,
}


export type QueryGetArticleArgs = {
	branch?: InputMaybe<Scalars['String']['input']>,
	directory?: InputMaybe<Scalars['String']['input']>,
	file: Scalars['String']['input'],
}


export type QueryGetCourseArgs = {
	id: Scalars['ID']['input'],
}


export type QueryGetProjectArgs = {
	id: Scalars['ID']['input'],
}


export type QueryIndexArticlesArgs = {
	branch?: InputMaybe<Scalars['String']['input']>,
	directory?: InputMaybe<Scalars['String']['input']>,
}

export enum Role {
	GUEST = 'GUEST',
	OWNER = 'OWNER',
	USER = 'USER',
}

export type User = {
	__typename?: 'User',
	email: Scalars['String']['output'],
	id: Scalars['ID']['output'],
	role: Role,
	username: Scalars['String']['output'],
}

export type AdditionalEntityFields = {
	path?: InputMaybe<Scalars['String']['input']>,
	type?: InputMaybe<Scalars['String']['input']>,
}
export type ArticleDbObject = {
	data: ArticleData,
	html: string,
}

export type CourseDbObject = {
	description?: Maybe<string>,
	_id: ObjectId,
	name: string,
	projects?: Maybe<Array<ProjectDbObject['_id']>>,
}

export type ProjectDbObject = {
	courses?: Maybe<Array<CourseDbObject['_id']>>,
	description?: Maybe<string>,
	_id: ObjectId,
	name: string,
}

export type UserDbObject = {
	email: string,
	_id: ObjectId,
	role: string,
	username: string,
	password: string,
}


export type ResolverTypeWrapper<T> = Promise<T> | T


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>,
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{[key in TKey]: TResult}, TParent, TContext, TArgs>,
	resolve?: SubscriptionResolveFn<TResult, {[key in TKey]: TResult}, TContext, TArgs>,
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>,
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>,
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = ( ) => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Article: ResolverTypeWrapper<Article>,
	String: ResolverTypeWrapper<Scalars['String']['output']>,
	ArticleData: ResolverTypeWrapper<ArticleData>,
	Course: ResolverTypeWrapper<CourseDbObject>,
	ID: ResolverTypeWrapper<Scalars['ID']['output']>,
	Mutation: ResolverTypeWrapper<{}>,
	Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>,
	Project: ResolverTypeWrapper<ProjectDbObject>,
	Query: ResolverTypeWrapper<{}>,
	Role: Role,
	User: ResolverTypeWrapper<UserDbObject>,
	AdditionalEntityFields: AdditionalEntityFields,
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Article: Article,
	String: Scalars['String']['output'],
	ArticleData: ArticleData,
	Course: CourseDbObject,
	ID: Scalars['ID']['output'],
	Mutation: {},
	Boolean: Scalars['Boolean']['output'],
	Project: ProjectDbObject,
	Query: {},
	User: UserDbObject,
	AdditionalEntityFields: AdditionalEntityFields,
}

export type UnionDirectiveArgs = {
	discriminatorField?: Maybe<Scalars['String']['input']>,
	additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>,
}

export type UnionDirectiveResolver<Result, Parent, ContextType = Context, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AbstractEntityDirectiveArgs = {
	discriminatorField: Scalars['String']['input'],
	additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>,
}

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = Context, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type EntityDirectiveArgs = {
	embedded?: Maybe<Scalars['Boolean']['input']>,
	additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>,
}

export type EntityDirectiveResolver<Result, Parent, ContextType = Context, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ColumnDirectiveArgs = {
	overrideType?: Maybe<Scalars['String']['input']>,
}

export type ColumnDirectiveResolver<Result, Parent, ContextType = Context, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IdDirectiveArgs = { }

export type IdDirectiveResolver<Result, Parent, ContextType = Context, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type LinkDirectiveArgs = {
	overrideType?: Maybe<Scalars['String']['input']>,
}

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type EmbeddedDirectiveArgs = { }

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = Context, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type MapDirectiveArgs = {
	path: Scalars['String']['input'],
}

export type MapDirectiveResolver<Result, Parent, ContextType = Context, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ArticleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
	data?: Resolver<ResolversTypes['ArticleData'], ParentType, ContextType>,
	html?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>,
}

export type ArticleDataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ArticleData'] = ResolversParentTypes['ArticleData']> = {
	slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>,
}

export type CourseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
	description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>,
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>,
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
	createCourse?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateCourseArgs, 'name'>>,
	createProject?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'name'>>,
	createUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>>,
	deleteCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, 'id'>>,
	deleteProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>,
	deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
	signInUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSignInUserArgs, 'password' | 'username'>>,
	updateCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'id'>>,
	updateProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'id'>>,
}

export type ProjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
	courses?: Resolver<Maybe<Array<ResolversTypes['Course']>>, ParentType, ContextType>,
	description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>,
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
	getArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryGetArticleArgs, 'file'>>,
	getCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryGetCourseArgs, 'id'>>,
	getMe?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
	getProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryGetProjectArgs, 'id'>>,
	indexArticles?: Resolver<Maybe<Array<ResolversTypes['Article']>>, ParentType, ContextType, Partial<QueryIndexArticlesArgs>>,
	indexCourses?: Resolver<Maybe<Array<ResolversTypes['Course']>>, ParentType, ContextType>,
	indexProjects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>,
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
	email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>,
	username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>,
}

export type Resolvers<ContextType = Context> = {
	Article?: ArticleResolvers<ContextType>,
	ArticleData?: ArticleDataResolvers<ContextType>,
	Course?: CourseResolvers<ContextType>,
	Mutation?: MutationResolvers<ContextType>,
	Project?: ProjectResolvers<ContextType>,
	Query?: QueryResolvers<ContextType>,
	User?: UserResolvers<ContextType>,
}

export type DirectiveResolvers<ContextType = Context> = {
	union?: UnionDirectiveResolver<any, any, ContextType>,
	abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>,
	entity?: EntityDirectiveResolver<any, any, ContextType>,
	column?: ColumnDirectiveResolver<any, any, ContextType>,
	id?: IdDirectiveResolver<any, any, ContextType>,
	link?: LinkDirectiveResolver<any, any, ContextType>,
	embedded?: EmbeddedDirectiveResolver<any, any, ContextType>,
	map?: MapDirectiveResolver<any, any, ContextType>,
}
