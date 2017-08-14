import { createTodosResolve } from '../todos'

describe('todos resolve function', () => {
  it('returns todos', () => {
    const todoRepo = {
      find: () => [
        { title: "Go shopping", isCompleted: false },
        { title: "Wash the car", isCompleted: true },
      ]
    }
    const todosResolve = createTodosResolve(todoRepo)

    const todos = todosResolve(null, null)

    expect(todos).toEqual([
      { title: "Go shopping", isCompleted: false },
      { title: "Wash the car", isCompleted: true },
    ])
  })
})