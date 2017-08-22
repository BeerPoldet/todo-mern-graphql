import { buildSchema } from 'graphql'
import TodoResovler from './resolvers/todos'

export const schema = buildSchema(`
  type Query {
    todos: [Todo]
  }

  type Mutation {
    createTodo(title: String!, isCompleted: Boolean): Todo

    updateTodo(id: Int, title: String, isCompleted: Boolean): Todo
  }

  type Todo {
    title: String
    isCompleted: Boolean
  }
`)

export const createRoot = (repositories) => {
  const todoResovler = new TodoResovler(repositories.todoRepo)

  return {
    todos: todoResovler.query,
    createTodo: todoResovler.create,
    updateTodoIsCompleted: todoResovler.update
  }
}