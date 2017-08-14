import { createTodoRepo } from '../todoRepo'

const todos = [{ title: "Go shopping", isCompleted: false }]
const todoModel = { find: () => todos }

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
})