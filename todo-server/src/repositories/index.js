import TodoRepo from './todoRepo'

export const createRepositories = ({ todoModel }) => ({
  todoRepo: new TodoRepo(todoModel)
})