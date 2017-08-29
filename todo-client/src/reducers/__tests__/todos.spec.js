import todosReducer from '../todos'
import {
  fetchTodosCreator,
  createTodoCreator,
  updateTodoCreator,
  deleteTodoCreator,
} from '../../actions/todos'
import { createMockStore } from '../../mocks/store'
import { createMockFetch } from '../../mocks/fetch'

describe("initial state", () => {
  it("return empty array", () => {
    const state = todosReducer(undefined, { type: undefined })

    expect(state).toEqual([])
  })
})

describe("fetch todo", () => {
  it("return all todos", async () => {
    expect.assertions(4)

    await testFetchTodoReducer([
      { title: "Walk the dog", isCompleted: false }
    ])

    await testFetchTodoReducer([
      { title: "Walk the dog", isCompleted: false },
      { title: "Walk the dog", isCompleted: true }
    ])
  })

  const testFetchTodoReducer = async todos => {
    const fetchTodos = fetchTodosCreator(() => todos)
    const store = createMockStore(todosReducer)

    await store.dispatch(fetchTodos())

    expect(store.getStates()[0]).toEqual([])
    expect(store.getStates()[1]).toEqual(todos)
  }
})

describe("create todo", () => {
  it("create success", async () => {
    expect.assertions(4)

    await testCreateTodoReducer({ title: "Walk the dog", isCompleted: false })
    await testCreateTodoReducer({ title: "Wash the dishes", isCompleted: false })
  })

  const testCreateTodoReducer = async todo => {
    const createTodo = createTodoCreator(() => todo)
    const store = createMockStore(todosReducer)

    await store.dispatch(createTodo())

    expect(store.getStates()[0]).toEqual([])
    expect(store.getStates()[1]).toContainEqual(todo)
  }
})

describe("update todo", () => {
  it("update success", async () => {
    expect.assertions(6)

    await testUpdateTodoReducer({ id: 3, title: "Walk the dog", isCompleted: false }, 3, { isCompleted: true })
    await testUpdateTodoReducer({ id: 4, title: "Wash the dishes", isCompleted: true }, 4, { title: 'Wash just dish' })
  })

  const testUpdateTodoReducer = async (beforeTodo, id, partialTodo) => {
    const afterTodo = { ...beforeTodo, ...partialTodo }
    const updateTodo = updateTodoCreator(() => afterTodo)
    const store = createMockStore(todosReducer, [beforeTodo])

    await store.dispatch(updateTodo(beforeTodo.id, partialTodo))

    expect(store.getStates()[0]).toEqual([beforeTodo])
    expect(store.getStates()[1]).toContainEqual(beforeTodo)
    expect(store.getStates()[2]).toContainEqual(afterTodo)
  }
})

describe("Delete todo", () => {
  it('should delete todo from state(array)', async () => {
    const deleteTodo = deleteTodoCreator(() => true)
    const todos = [
      { id: '1', title: "Hello", isCompleted: true },
      { id: '2', title: "World", isCompleted: false }
    ]
    const store = createMockStore(todosReducer, todos)

    await store.dispatch(deleteTodo('1'))
  
    expect(store.getStates()[1]).toEqual(todos)
    expect(store.getStates()[2]).toEqual([ { id: '2', title: "World", isCompleted: false } ])

    await store.dispatch(deleteTodo('2'))

    expect(store.getStates()[3]).toEqual([ { id: '2', title: "World", isCompleted: false } ])
    expect(store.getStates()[4]).toEqual([])
  })
})