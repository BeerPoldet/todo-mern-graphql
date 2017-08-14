// @flow
import server from '../server'
import sinon from 'sinon'

describe('server could configs', () => {
  it('config express app', () => {
    const app = { use: (path, middleware) => {} }
    const graphqlHTTP = () => {}
    const spy = sinon.spy(app, "use")

    server.config(app, graphqlHTTP)
    
    const spyCalls = app.use.getCall(0)
    expect(app.use.calledOnce).toBeTruthy()
    expect(spyCalls.args[0]).toEqual("/graphql")
  })

  it('create graphqlHTTP middleware', () => {
    const graphqlHTTP = () => {}
    const graphqlHTTPSpy = sinon.spy(graphqlHTTP)

    server.createGraphHTTPMiddleware(graphqlHTTPSpy)

    expect(graphqlHTTPSpy.getCall(0).args[0]).toEqual({
      schema: expect.anything(),
      graphiql: true
    })
  })

  it('create graphql schema', () => {
    const schema = server.createGraphQLSchema()

    expect(schema).toBeDefined()
  })

  it('create query fields', () => {
    const fields = server.createQueryFields()

    expect(fields).toBeDefined()
    expect(fields.todos).toBeDefined()
  })
})

