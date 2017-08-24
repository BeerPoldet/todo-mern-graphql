import todosReducer from '../todos'
import { createFetchTodos } from '../../actions/todos'
import fetchMock from 'fetch-mock'
import { createMockStore } from '../../mocks/store'

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
})

const testFetchTodoReducer = async todos => {
  const fetchTodos = createFetchTodos(fetchMock.sandbox().mock('*', { todos }))
  const store = createMockStore(todosReducer)

  await store.dispatch(fetchTodos())

  expect(store.getStates()[0]).toEqual([])
  expect(store.getStates()[1]).toEqual(todos)
}