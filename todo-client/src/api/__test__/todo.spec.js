import TodoAPI from '../todo'
import { createMockFetch } from '../../mocks/fetch'

describe("list api", () => {
  it("list all todos", async () => {
    const testFetchAllTodosFromServer = async (serverTodos) => {
      const todoAPI = new TodoAPI(createMockFetch({ todos: serverTodos }))
      const todos = await todoAPI.list()

      expect(todos).toEqual(serverTodos)
    }

    await testFetchAllTodosFromServer([{ id: '1', title: "Hello", isCompleted: true }])
    await testFetchAllTodosFromServer([
      { id: '1', title: "Hello 1", isCompleted: true },
      { id: '2', title: "Hello 2", isCompleted: false },
    ])
  })
})

describe("create api", () => {
  it("create todo", async () => {
    const testCreateTodo = async todo => {
      const todoAPI = new TodoAPI(createMockFetch({ createTodo: todo }))
      const createdTodo = await todoAPI.create(todo.title)
  
      expect(createdTodo).toEqual(todo)
    }

    await testCreateTodo({ id: '1', title: "Hello 1", isCompleted: false })
    await testCreateTodo({ id: '2', title: "Hello 2", isCompleted: false })
  })
})

describe("update api", () => {
  it("update todo", async () => {
    const testUpdateTodo = async (todo, partialUpdate) => {
      const mergedTodo = { ...todo, ...partialUpdate }
      const todoAPI = new TodoAPI(createMockFetch({ updateTodo: mergedTodo }))
      const updatedTodo = await todoAPI.update(todo.id, partialUpdate)
  
      expect(updatedTodo).toEqual(mergedTodo)
    }

    await testUpdateTodo({ id: '1', title: "Hello 1", isCompleted: false }, { title: "Hi" })
    await testUpdateTodo({ id: '2', title: "Hello 2", isCompleted: false }, { isCompleted: true })
  })
})

describe("delete api", () => {
  it("delete todo success", async () => {
    const todoAPI = new TodoAPI(createMockFetch({ deleteTodo: true }))
    const result = await todoAPI.delete('1')
    expect(result).toBeTruthy()
  })

  it("delete todo failture", async () => {
    const todoAPI = new TodoAPI(createMockFetch({ deleteTodo: false }))
    const result = await todoAPI.delete('1')
    expect(result).toBeFalsy()
  })
})