import graphqlApp from '../graphqlApp'
import sinon from 'sinon'

const repositories = { todoRepo: null }

describe('server could configs', () => {
  it('create graphqlHTTP middleware', () => {
    const graphqlHTTP = () => {}
    const graphqlHTTPSpy = sinon.spy(graphqlHTTP)

    graphqlApp.createGraphHTTPMiddleware(graphqlHTTPSpy, repositories)

    expect(graphqlHTTPSpy.getCall(0).args[0]).toEqual({
      schema: expect.anything(),
      graphiql: true
    })
  })

  it('create graphql schema', () => {
    const schema = graphqlApp.createGraphQLSchema(repositories)

    expect(schema).toBeDefined()
  })

  it('create query fields', () => {
    const fields = graphqlApp.createQueryFields(repositories)

    expect(fields).toBeDefined()
    expect(fields.todos).toBeDefined()
  })

  it('create mutation fields', () => {
    const fields = graphqlApp.createMutationFields(repositories)

    expect(fields.createTodo).toBeDefined()
  })
})

