import express from 'express'
import graphHTTP from 'express-graphql'
import { schema, createRoot } from './graphql'
import { createRepositories } from './repositories'
import * as memDB from './mem-db'

const app = express()

const repositories = createRepositories({
  todoModel: new memDB.TodoModel()
})

app.use("/graphql", graphHTTP({
  schema: schema,
  rootValue: createRoot(repositories),
  graphiql: true
}))

const port = 3001
app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`)
})