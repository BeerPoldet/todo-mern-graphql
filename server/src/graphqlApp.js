import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import { createGraphQLTodosType, createTodoMutations } from './graphqlTypes/todos'

export const createGraphHTTPMiddleware = (graphqlHTTP, repositories) => {
  return graphqlHTTP({
    schema: createGraphQLSchema(repositories),
    graphiql: true
  })
}

export const createGraphQLSchema = (repositories) => new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: createQueryFields(repositories)
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: createMutationFields(repositories)
  })
})

export const createQueryFields = (repositories) => ({
  todos: createGraphQLTodosType(repositories.todoRepo)
})

export const createMutationFields = (repositories) => ({
  ...createTodoMutations(repositories.todoRepo)
})

export default {
  createGraphHTTPMiddleware,
  createGraphQLSchema,
  createQueryFields,
  createMutationFields
}