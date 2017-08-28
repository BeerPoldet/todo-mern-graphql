import graphqlFetch from './graphqlFetch'

export default class TodoAPI {
  constructor(fetch) {
    this.fetch = fetch;
  }

  list = () =>
    graphqlFetch(this.fetch, { query: "{ todos { id title isCompleted } }" })
      .then(data => data.todos)

  create = title =>
    graphqlFetch(this.fetch, {
      operationName: "CreateTodo",
      query: `
        mutation CreateTodo($title: String!) { 
          createTodo(title: $title) { id title isCompleted } 
        }
      `,
      variable: { title }
    })
      .then(data => data.createTodo)

  update = (id, partialTodo) =>
    graphqlFetch(this.fetch, {
      operationName: "UpdateTodo",
      query: `
        mutation UpdateTodo($id: ID!, $title: String, $isCompleted: Boolean) {
          updateTodo(id: $id, title: $title, isCompleted: $isCompleted) { id title isCompleted }
        }
      `
    })
      .then(data => data.updateTodo)

  delete = id =>
    graphqlFetch(this.fetch, {
      operationName: "DeleteTodo",
      query: `
        mutation DeleteTodo($id: ID!) {
          deleteTodo(id: $id) {  }
        }
      `
    })
}