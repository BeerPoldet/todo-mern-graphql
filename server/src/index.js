import express from 'express'
import graphHTTP from 'express-graphql'
import { createGraphHTTPMiddleware } from './graphqlApp'
import { createRepositories } from './repositories'

const app = express()
const repositories = createRepositories({
  todoModel: {
    find: () => [
      { title: "Go shopping", isCompleted: false },
      { title: "Wash the car", isCompleted: true }
    ]
  }
})
app.use("/graphql", createGraphHTTPMiddleware(graphHTTP, repositories))

const port = 3001
app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`)
})