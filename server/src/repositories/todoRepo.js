export const createTodoRepo = (todoModel) => ({
  find: () => todoModel.find(),
  save: (todo) => todoModel.save(todo)
})