import { buildSchema } from 'graphql'
import TodoResovler from './resolvers/todos'

export const schema = buildSchema(`
  type Query {
    todos: [Todo]
  }

  type Mutation {
    createTodo(title: String!, isCompleted: Boolean): Todo

    updateTodo(id: ID!, title: String, isCompleted: Boolean): Todo

    deleteTodo(id: ID!): Boolean
  }

  type Todo {
    id: ID!,
    title: String
    isCompleted: Boolean
  }
`)

export const createRoot = (repositories) => {
  const todoResovler = new TodoResovler(repositories.todoRepo)

  return {
    todos: todoResovler.query,
    createTodo: todoResovler.create,
    updateTodo: todoResovler.update,
    deleteTodo: todoResovler.delete,
  }
}