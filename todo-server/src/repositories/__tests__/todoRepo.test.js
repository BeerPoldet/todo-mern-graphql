import TodoRepo from '../todoRepo'
import { TodoModel } from '../../mem-db'

describe("Initialize", () => {
  it('init todoRepo takes todoModel', () => {
    const todoModel = new TodoModel([])
    const todoRepo = new TodoRepo(todoModel)

    expect(todoRepo).toBeDefined()
  })
})

describe("Find Todos", () => {
  it("should find one todo", () => {
    const initTodos = [{ title: "Go shopping", isCompleted: true }]
    const todoModel = new TodoModel(initTodos)
    const todoRepo = new TodoRepo(todoModel)

    const todos = todoRepo.find()

    expect(todos).toEqual(initTodos)
  })

  it("should find many todos", () => {
    const initTodos = [
      { id: 1, title: "Go shopping", isCompleted: true },
      { id: 2, title: "Wash the car", isCompleted: false }
    ]
    const todoModel = new TodoModel(initTodos)
    const todoRepo = new TodoRepo(todoModel)

    const todos = todoRepo.find()

    expect(todos).toEqual(initTodos)
  })
})

describe("Insert Todo", () => {
  it("should insert todo in db", () => {
    const todoModel = new TodoModel([])
    const todoRepo = new TodoRepo(todoModel)

    const todo1 = todoRepo.insert({ title: "Go farming" })
    const todo2 = todoRepo.insert({ title: "Drink coffee" })
    const todos = todoRepo.find()

    expect(todo1).toMatchObject({ id: '1', title: "Go farming", isCompleted: false })
    expect(todo2).toMatchObject({ id: '2', title: "Drink coffee", isCompleted: false })
    expect(todos).toEqual([
      { id: '1', title: "Go farming", isCompleted: false },
      { id: '2', title: "Drink coffee", isCompleted: false }
    ])
  })
})

describe("todoRepo update()", () => {
  const todoModel = new TodoModel([])
  const todoRepo = new TodoRepo(todoModel)
  let newTodo

  beforeAll(() => {
    newTodo = todoRepo.insert({ title: "Walk the dog", isCompleted: true })
  })

  it("update return todo", () => {
    const todo = todoRepo.update({ id: newTodo.id, isCompleted: false, title: "Walk the cat" })

    expect(todo.isCompleted).toBeFalsy()
    expect(todo.title).toEqual("Walk the cat")
    expect(todo.id).toEqual(newTodo.id)
    expect(todo.id).toBeDefined()
  })

  it("update affect todos database", () => {
    const todos = todoRepo.find()

    const updatedTodo = todos.find(todo => todo.id === newTodo.id)

    expect(updatedTodo.isCompleted).toBeFalsy()
    expect(updatedTodo.title).toEqual("Walk the cat")
    expect(updatedTodo.id).toEqual(newTodo.id)
    expect(updatedTodo.id).toBeDefined()
  })
})

describe("delete todo", () => {
  it('delete todo with id', () => {
    const testDeleteTodoWithId = (initTodos, id, afterTodos) => {
      const todoModel = new TodoModel(initTodos)
      const todoRepo = new TodoRepo(todoModel)

      todoRepo.delete(id)

      expect(todoRepo.find()).toEqual(afterTodos)
    }

    testDeleteTodoWithId([{ id: '1', title: "HELLO" }], '1', [])
    testDeleteTodoWithId(
      [{ id: '1', title: "HELLO" }, { id: '2', title: "Hi" },],
      '1',
      [{ id: '2', title: "Hi" }]
    )
  })

  describe('return deletion result', () => {
    it('true when successfully', () => {
      const todoModel = new TodoModel([{ id: '1' }])
      const todoRepo = new TodoRepo(todoModel)

      const result = todoRepo.delete('1')

      expect(result).toBeTruthy()
    })

    it('false then failure', () => {
      const todoModel = new TodoModel([{ id: '1' }])
      const todoRepo = new TodoRepo(todoModel)

      const result = todoRepo.delete('2')

      expect(result).toBeFalsy()
    })
  })
})