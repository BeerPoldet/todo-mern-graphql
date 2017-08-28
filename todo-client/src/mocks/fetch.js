import fetchMock from 'fetch-mock'

export const createMockFetch = data =>
  fetchMock
    .sandbox()
    .post('http://localhost:3000/graphql',
    { data: data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
