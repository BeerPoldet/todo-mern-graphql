import fetchMock from 'fetch-mock'
import {
  createFetchTodos,
  FETCH_TODO_PENDING,
  FETCH_TODO_SUCCESS
} from '../todos'
import sinon from 'sinon'

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
    const dispatch = sinon.spy()
    const fetch = fetchMock.sandbox().mock('*', { todos })
    const fetchTodos = createFetchTodos(fetch)
    const thunk = fetchTodos()

    await thunk(dispatch)

    expect(dispatch.getCall(0).args[0]).toMatchObject({
      type: FETCH_TODO_PENDING
    })
    expect(dispatch.getCall(1).args[0]).toMatchObject({
      type: FETCH_TODO_SUCCESS,
      data: todos
    })
  }
})