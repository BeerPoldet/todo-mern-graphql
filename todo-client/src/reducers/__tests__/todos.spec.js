import todos from '../todos'
import { fetchTodos } from '../../actions/todos'

describe("initial state", () => {
  it("return empty array", () => {
    const state = todos(undefined, { type: undefined })

    expect(state).toEqual([])
  })
})

describe("fetch todo", () => {
  it("return all todos", () => {
    const state = todos(undefined, fetchTodos())

    expect(state).toEqual([
      { title: "Walk the dog", isCompleted: false }
    ])
  })
})