# Portfolio Backend
## Setup
1. Clone this repository by running `git clone git@github.com/nebuloid-blog/backend.git`.
1. In your terminal, `cd` into the project root.
1. Create a `.env` file and populate it with the requisite data!
1. Run `yarn` to install dependencies.
1. Run `git submodule init` to register submodules.
1. Run `git submodule update` to clone submodules.
1. Open Docker Desktop and run `docker-compose up -d`.
1. Finally, you can run `yarn start` or `yarn dev`.
1. Now, you can use apps like *MongoDB Compass* and *Altair GraphQL Client*!

## Project Details
### Notable Technologies
- [GraphQL]
- [GraphQL Code Generator]
- [Express]
- [Mongoose]
- [Node]
- [TypeScript]

### Opinions
I started this project out using **Express** + **GraphQL**.
**GraphQL** is my preferred choice for APIs because of how fast it is!

This project does not use **Apollo GraphQL**, because it wasn't reasonable or me to build the backend with that large of a scope.
If needed, I can grab utilities from **Apollo** *à la carte*.
See also, [*GraphQL the Simple Way*].

When creating an API, the frontend is only as powerful as the backend!
The backend opts to use GraphQL Codegen for type declarations.
See also, [*GraphQL.js vs. TypeGraphQL vs. GraphQL Nexus*]

#### Linters
For this project, I've opted to generate my own styleguide to follow.
I'd like to delve into the deep end of formatters and understand what they are capable of.
After all, I do have my own opinions about code style, as does everyone else of course.
To make this work, I've extended my own ESLint config, **Tabbify**.

### Tutorials
- [*Creating an API with GraphQL*]
- [*GQL CodeGen for MongoDB*]
- [*Type Safety for GQL Resolvers*]

<!-- Packages --->
[GraphQL]:
	https://graphql.org/

[GraphQL Code Generator]:
	https://www.graphql-code-generator.com/

[Express]:
	https://expressjs.com/

[Mongoose]:
	https://mongoosejs.com/

[Node]:
	https://nodejs.org/en/

[TypeScript]:
	https://www.typescriptlang.org/

<!-- Articles --->
[*Creating an API with GraphQL*]:
	https://fjolt.com/article/graphql-express-node-js-mongodb-api
		"Creating an API with GraphQL, MongoDB, and Express"

[*Docker Compose with MongoDB Replica Sets*]:
	https://anthonysimmon.com/the-only-local-mongodb-replica-set-with-docker-compose-guide-youll-ever-need/
		"The only local MongoDB replica set with Docker Compose guide you'll ever need!"

[*GraphQL the Simple Way*]:
	https://httptoolkit.tech/blog/simple-graphql-server-without-apollo/
		"GraphQL the Simple Way, or: Don't Use Apollo"

[*GraphQL.js vs. TypeGraphQL vs. GraphQL Nexus*]:
	https://medium.com/swlh/graphql-js-vs-typegraphql-vs-graphql-nexus-2a8036deb851
		"GraphQL.js vs. TypeGraphQL vs. GraphQL Nexus"

[*GQL CodeGen for MongoDB*]:
	https://www.graphql-code-generator.com/plugins/typescript-mongodb
		"GraphQL Code Generator: TypeScript MongoDB"

[*Type Safety for GQL Resolvers*]:
	https://www.the-guild.dev/blog/better-type-safety-for-resolvers-with-graphql-codegen
		"Better Type Safety for your GraphQL resolvers with GraphQL Codegen"
