export class TodoModel {
  todos = [
    { id: '1', title: "Go shopping", isCompleted: false },
    { id: '2', title: "Wash the car", isCompleted: true }
  ]

  nextId = () => this.todos.length > 0 ? String(Number(this.todos[this.todos.length - 1].id) + 1) : '1';

  constructor(initTodos) {
    if (initTodos) {
      this.todos = initTodos;
    }
  }

  find = () => this.todos

  save = (todo) => {
    const newTodo = { ...todo, id: (this.nextId()), isCompleted: todo.isCompleted || false }
    this.todos.push(newTodo)
    return newTodo
  }

  update(partialTodo) {
    const index = this.todos.findIndex(t => t.id === partialTodo.id)
    Object.keys(partialTodo).forEach(k => partialTodo[k] === undefined && delete partialTodo[k])
    this.todos[index] = { ...this.todos[index], ...partialTodo }
    return this.todos[index]
  }
}