export default class TodoRepo {
  constructor(todoModel) {
    this.todoModel = todoModel
  }

  find() {
    return this.todoModel.find()
  }
  insert(todo) {
    return this.todoModel.save(todo)
  }

  update(partialTodo) {
    return this.todoModel.update(partialTodo)
  }

  delete(id) {
    return this.todoModel.delete(id)
  }
}