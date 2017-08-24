import fetchMock from 'fetch-mock'
import {
  createFetchTodos,
  types,
} from '../todos'
import sinon from 'sinon'
import { createMockStore } from '../../mocks/store'

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
    const fetchTodos = createFetchTodos(fetchMock.sandbox().mock('*', { todos }))
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