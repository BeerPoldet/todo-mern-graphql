import { createTodoRepo } from '../todoRepo'

const todos = [{ title: "Go shopping", isCompleted: false }]
const todoModel = { find: () => todos, save: (todo) => ({ ...todo, id: 4 }) }

describe("todoRepo", () => {
  it('create todo repo', () => {
    const todoRepo = createTodoRepo(todoModel)

    expect(todoRepo).toBeDefined()
  })

  it("find todos", () => {
    const todoRepo = createTodoRepo(todoModel)

    const todos = todoRepo.find()

    expect(todos).toEqual(todos)
  })

  it("save todos", () => {
    const todoRepo = createTodoRepo(todoModel)
    
    const todo = todoRepo.save({ title: 'Wash the dishes' })

    expect(todo).toMatchObject({ title: "Wash the dishes" })
  })
})