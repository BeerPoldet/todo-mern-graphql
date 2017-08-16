export const queryTodosResolveCreator = (todoRepo) => (args) => todoRepo.find()

export const createTodoResolveCreator = (todoRepo) => ({ title, isCompleted }) => todoRepo.save({ title, isCompleted })