import { buildSchema } from 'graphql'
import { queryTodosResolveCreator, createTodoResolveCreator } from './resolvers/todos'

export const schema = buildSchema(`
  type Query {
    todos: [Todo]
  }

  type Mutation {
    createTodo(title: String!, isCompleted: Boolean): Todo
  }

  type Todo {
    title: String
    isCompleted: Boolean
  }
`)

export const createRoot = (repositories) => ({
  todos: queryTodosResolveCreator(repositories.todoRepo),
  createTodo: createTodoResolveCreator(repositories.todoRepo)
})