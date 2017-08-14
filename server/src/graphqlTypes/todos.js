import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'

export const createGraphQLTodosType = (todoRepo) => ({
  type: new GraphQLList(makeGraphQLTodoType()),
  resolve: createTodosResolve(todoRepo)
})

const makeGraphQLTodoType = () => new GraphQLObjectType({
  name: "Todo",
  fields: {
    title: { type: GraphQLString, resolve: ({ title }) => title },
    isCompleted: { type: GraphQLBoolean, resolve: ({ isCompleted }) => isCompleted }
  }
})

export const createTodosResolve = (todoRepo) => (root, args) => todoRepo.find()