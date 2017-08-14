export const createTodoRepo = (todoModel) => ({
  find: () => todoModel.find()
})