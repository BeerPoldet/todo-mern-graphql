import { createTodosResolve, createTodoMutations } from '../todos'

const todoRepo = {
  find: () => [
    { title: "Go shopping", isCompleted: false },
    { title: "Wash the car", isCompleted: true },
  ]
}

describe('todos resolve function', () => {
  it('returns todos', () => {
    const todosResolve = createTodosResolve(todoRepo)

    const todos = todosResolve(null, null)

    expect(todos).toEqual([
      { title: "Go shopping", isCompleted: false },
      { title: "Wash the car", isCompleted: true },
    ])
  })
})

describe('createMutationTodoType', () => {
  it('contains mutation methods', () => {
    const todoMutations = createTodoMutations(todoRepo)

    expect(todoMutations.createTodo).toBeDefined()
  })
})