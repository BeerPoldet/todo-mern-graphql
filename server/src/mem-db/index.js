export class TodoModel {
  todos = [
    { title: "Go shopping", isCompleted: false },
    { title: "Wash the car", isCompleted: true }
  ]

  find = () => this.todos

  save = (todo) => {
    const newTodo = { ...todo, id: 4, isCompleted: todo.isCompleted || false }
    this.todos.push(newTodo)
    return newTodo
  }
}