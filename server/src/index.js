import express from 'express'
import graphHTTP from 'express-graphql'
import { createGraphHTTPMiddleware } from './graphqlApp'
import { createRepositories } from './repositories'

const app = express()

const todos = [
  { title: "Go shopping", isCompleted: false },
  { title: "Wash the car", isCompleted: true }
]
const repositories = createRepositories({
  todoModel: {
    find: () => todos,
    save: (todo) => {
      const newTodo = { ...todo, id: 4, isCompleted: todo.isCompleted || false }
      todos.push(newTodo)
      return newTodo
    }
  }
})
app.use("/graphql", createGraphHTTPMiddleware(graphHTTP, repositories))

const port = 3001
app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`)
})