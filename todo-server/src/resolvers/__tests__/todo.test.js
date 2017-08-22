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

    expect(todoRepoSpy.getCall(0).args[0]).toMatchObject({ title: "Do dishes", isCompleted: true })
  })
})

describe('updateTodoResolve()', () => {
  it('calls todoRepo.update()', () => {
    const todoRepoSpy = sinon.spy(todoRepo, "update")
    const todoResolver = new TodoResolver(todoRepo)
    const args = { isCompleted: true }
    
    todoResolver.update(args)
    
    expect(todoRepoSpy.getCalls()[0].args[0]).toEqual({
      isCompleted: true
    })
  })
})