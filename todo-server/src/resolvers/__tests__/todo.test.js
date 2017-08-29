import TodoResolver from '../todos'
import * as memDB from '../../mem-db'
import { createRepositories } from '../../repositories'
import sinon from 'sinon'

const repositories = createRepositories({
  todoModel: new memDB.TodoModel()
})

const { todoRepo } = repositories

describe('queryTodosResolve()', () => {
  it('calls todoRepo.find()', () => {
    const todoRepoSpy = sinon.spy(todoRepo, "find")
    const todoResolver = new TodoResolver(todoRepo)
    const args = {};

    todoResolver.query(args)

    expect(todoRepoSpy.getCall(0).args[0]).toEqual(undefined)
  })
})

describe('createTodoResolve()', () => {
  it('calls todoRepo.insert()', () => {
    const todoRepoSpy = sinon.spy(todoRepo, 'insert')
    const todoResolver = new TodoResolver(todoRepo)
    const args = { title: "Do dishes", isCompleted: true }

    todoResolver.create(args)

    expect(todoRepoSpy.getCall(0).args[0]).toMatchObject(args)
  })
})

describe('updateTodoResolve()', () => {
  it('calls todoRepo.update()', () => {
    const todoRepoSpy = sinon.spy(todoRepo, "update")
    const todoResolver = new TodoResolver(todoRepo)
    const args = { id: 1, isCompleted: true }

    todoResolver.update(args)

    expect(todoRepoSpy.getCalls()[0].args[0]).toEqual(args)
    todoRepoSpy.restore()
  })
  
  it('calls todoRepo.update() with parital todo', () => {
    const todoRepoSpy = sinon.spy(todoRepo, "update")
    const todoResolver = new TodoResolver(todoRepo)
    const args = { id: 1, isCompleted: true, title: undefined }
    
    todoResolver.update(args)
    
    expect(todoRepoSpy.getCalls()[0].args[0]).toEqual(args)
    todoRepoSpy.restore()
  })
})

describe("Delete", () => {
  it('should return boolean', () => {
    const todoRepoSpy = sinon.spy(todoRepo, "delete")
    const todoResolve = new TodoResolver(todoRepo)

    todoResolve.delete({ id: 1 })

    expect(todoRepoSpy.getCall(0).args).toEqual([1])
    todoRepoSpy.restore()
  })
})