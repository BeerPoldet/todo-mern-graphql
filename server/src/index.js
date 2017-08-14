// @flow
import express from 'express'
import graphHTTP from 'express-graphql'
import server from './server'

const app = express()
server.config(app, graphHTTP)

const port = 3001
app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`)
})