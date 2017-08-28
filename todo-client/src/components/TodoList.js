import React from 'react'
import Todo from './Todo'
import { fetchTodos } from '../actions/todos'
import * as actions from '../actions/todos'
import TodoAPI from '../api/todo'
import { connect } from 'react-redux'

const updateTodo = actions.updateTodoCreator(fetch)
const deleteTodo = actions.deleteTodoCreator(fetch)

class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  isCompletedDidChange = (id, isCompleted) => {
    this.props.updateTodo(id, { isCompleted })
  }

  titleDidChange = (id, title) => {
    this.props.updateTodo(id, { title })
  }
  
  todoWillDelete = id => {
    this.props.deleteTodo(id)
  }

  render() {
    const { todos } = this.props
    return (
      <div className="main">
        <ul className="todo-list">
          {todos.map(todo => 
            <Todo key={todo.title} todo={todo} 
              isCompletedDidChange={this.isCompletedDidChange}
              titleDidChange={this.titleDidChange}
              todoWillDelete={this.todoWillDelete} />
          )}
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({ todos: state.todos }),
  { fetchTodos, updateTodo, deleteTodo }
)(TodoList)