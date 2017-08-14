import { createTodoRepo } from './todoRepo'

export const createRepositories = ({ todoModel }) => ({
  todoRepo: createTodoRepo(todoModel)
})