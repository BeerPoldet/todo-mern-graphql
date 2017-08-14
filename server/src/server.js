// @flow
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'

export const config = (app: any, graphqlHTTP: any) => {
  app.use("/graphql", createGraphHTTPMiddleware(graphqlHTTP))
}

export const createGraphHTTPMiddleware = (graphqlHTTP: any) => {
  return graphqlHTTP({
    schema: createGraphQLSchema(),
    graphiql: true
  })
}

export const createGraphQLSchema = () => new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: createQueryFields()
  })
})

export const createQueryFields = () => ({
  todos: {
    type: new GraphQLList(makeTodoGraphQLObjectType()),
    resolve: (root: any, args: any) => [
      { title: "Go shopping", isCompleted: false },
      { title: "Wash the car", isCompleted: true },
    ]
  }
})

const makeTodoGraphQLObjectType = () => new GraphQLObjectType({
  name: "Todo",
  fields: {
    title: { type: GraphQLString, resolve: ({ title }) => title },
    isCompleted: { type: GraphQLBoolean, resolve: ({ isCompleted }) => isCompleted }
  }
})

export default {
  config,
  createGraphHTTPMiddleware,
  createGraphQLSchema,
  createQueryFields
}