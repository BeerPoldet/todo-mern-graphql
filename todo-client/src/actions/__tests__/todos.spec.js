import {
  fetchTodosCreator,
  createTodoCreator,
  updateTodoCreator,
  deleteTodoCreator,
  types,
} from '../todos'
import sinon from 'sinon'
import { createMockStore } from '../../mocks/store'
import { createMockFetch } from '../../mocks/fetch'

describe("Fetch Todos", () => {
  it("should success with data contains todos", async () => {
    expect.assertions(4)
    await testFetchTodosSuccess([
      { title: 'Go walking', isCompleted: false }
    ])
    await testFetchTodosSuccess([
      { title: 'Go walking', isCompleted: false },
      { title: 'Wash the dishes', isCompleted: true }
    ])
  })

  const testFetchTodosSuccess = async (todos) => {
    const fetchTodos = fetchTodosCreator(() => todos)
    const store = createMockStore()

    await store.dispatch(fetchTodos())
    const actions = store.getActions()

    expect(actions[0]).toMatchObject({ type: types.FETCH_TODO_PENDING })
    expect(actions[1]).toMatchObject({
      type: types.FETCH_TODO_SUCCESS,
      data: todos
    })
  }
})

describe("Create Todo", () => {
  it('should create success', async () => {
    expect.assertions(4)
    await testCreateTodoSuccess({ title: "Hello", isCompleted: false })
    await testCreateTodoSuccess({ title: "Hi", isCompleted: false })
  })

  const testCreateTodoSuccess = async (todo) => {
    const createTodo = createTodoCreator(() => todo)
    const store = createMockStore()

    await store.dispatch(createTodo(todo.title))
    const actions = store.getActions()

    expect(actions[0]).toMatchObject({ type: types.CREATE_TODO_PENDING })
    expect(actions[1]).toMatchObject({ type: types.CREATE_TODO_SUCCESS, data: todo })
  }
})

describe("Update Todo", () => {
  it('should update success', async () => {
    expect.assertions(6)
    await testUpdateTodoSuccess(
      { id: '1', title: "Hello", isCompleted: true },
      '1',
      { isCompleted: false }
    )
    await testUpdateTodoSuccess(
      { id: '2', title: "Hi", isCompleted: false },
      '2',
      { title: 'Hi' }
    )
    await testUpdateTodoSuccess(
      { id: '4', title: "Hi", isCompleted: false },
      '4',
      { title: 'Hi ya', isCompleted: true }
    )
  })

  const testUpdateTodoSuccess = async (beforeTodo, id, partialUpdate) => {
    const afterTodo = { ...beforeTodo, ...partialUpdate }
    const updateTodo = updateTodoCreator(() => afterTodo)
    const store = createMockStore()

    await store.dispatch(updateTodo(id, partialUpdate))
    const actions = store.getActions()

    expect(actions[0]).toMatchObject({ type: types.UPDATE_TODO_PENDING })
    expect(actions[1]).toMatchObject({
      type: types.UPDATE_TODO_SUCCESS,
      id,
      data: afterTodo
    })
  }
})

describe("Delete Todo", () => {
  it('should delete success', () => {
    const deleteTodo = deleteTodoCreator(createMockFetch())
    const store = createMockStore()

    store.dispatch(deleteTodo())
    const actions = store.getActions()

    expect(actions[0]).toMatchObject({ type: types.DELETE_TODO_PENDING })
    expect(actions[1]).toMatchObject({ type: types.DELETE_TODO_SUCCESS })
  })
})