export class TodoModel {
  lastId = 0;
  todos = [
    { id: 1, title: "Go shopping", isCompleted: false },
    { id: 2, title: "Wash the car", isCompleted: true }
  ]

  constructor(initTodos) {
    if (initTodos) {
      this.todos = initTodos;
    }
  }

  find = () => this.todos

  save = (todo) => {
    const newTodo = { ...todo, id: (++this.lastId), isCompleted: todo.isCompleted || false }
    this.todos.push(newTodo)
    return newTodo
  }

  update(partialTodo) {
    const index = this.todos.findIndex(t => t.id === partialTodo.id)
    this.todos[index] = { ...this.todos[index], ...partialTodo }
    return this.todos[index]
  }
}