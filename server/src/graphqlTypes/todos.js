import * as graphql from 'graphql'

export const createGraphQLTodosType = (todoRepo) => ({
  type: new graphql.GraphQLList(TodoType),
  resolve: createTodosResolve(todoRepo)
})

export const createTodoMutations = (todoRepo) => ({
  createTodo: {
    type: TodoType,
    args: { todo: { type: TodoInputType } },
    resolve: (value, { todo }) => todoRepo.save(todo)
  }
})

export const TodoType = new graphql.GraphQLObjectType({
  name: "Todo",
  fields: {
    title: { type: graphql.GraphQLString, resolve: ({ title }) => title },
    isCompleted: { type: graphql.GraphQLBoolean, resolve: ({ isCompleted }) => isCompleted }
  }
})

export const TodoInputType = new graphql.GraphQLInputObjectType({
  name: "TodoInput",
  fields: {
    title: { type: graphql.GraphQLString },
    isCompleted: { type: graphql.GraphQLBoolean }
  }
})

export const createTodosResolve = (todoRepo) => (root, args) => todoRepo.find()