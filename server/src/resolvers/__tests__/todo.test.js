import { queryTodosResolveCreator, createTodoResolveCreator } from '../todos'
import * as memDB from '../../mem-db'
import { createRepositories } from '../../repositories'

const repositories = createRepositories({
  todoModel: new memDB.TodoModel()
})

const { todoRepo } = repositories

describe('todos resolve function', () => {
  it('returns todos', () => {
    const queryTodosResolve = queryTodosResolveCreator(todoRepo)

    const todos = queryTodosResolve(null, null)

    expect(todos).toEqual([
      { title: "Go shopping", isCompleted: false },
      { title: "Wash the car", isCompleted: true },
    ])
  })
})

describe('createTodoMutations', () => {
  it('contains mutation methods', () => {
    const createTodoResolve = createTodoResolveCreator(todoRepo)

    const todo = createTodoResolve({ title: "Do dishes", isCompleted: true })

    expect(todo).toMatchObject({ title: "Do dishes", isCompleted: true })
  })
})