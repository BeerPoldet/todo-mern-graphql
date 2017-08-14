import { createRepositories } from '../index'

test("createRepositories", () => {
  const models = {
    todoModel: {
      find: () => [
        { title: "Go shopping", isCompleted: false },
        { title: "Wash the car", isCompleted: true }
      ]
    }
  }
  const repositories = createRepositories(models)

  expect(repositories.todoRepo).toBeDefined()
})