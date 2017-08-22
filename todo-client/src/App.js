import React, { Component } from 'react';
import './App.css';
import Layout from 'antd/lib/layout'
import TodoList from 'components/TodoList'

class App extends Component {
  state = {
    todos: []
  }

  componentWillMount() {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ todos { title isCompleted } }` })
    }).then(res => res.json())
      .then(({ data }) => {
        this.setState(data)
      })
  }

  updateTodoIsCompleted(todo, isCompleted) {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            updateTodo(title: "${todo.title}", isCompleted: ${isCompleted}) {
              isCompleted
            }
          }
        `
      })
    }).then(res => res.json())
      .then(({ data }) => {
        this.setState(({ todos }) => ({
          todos: todos.map(t => t === todo ? { ...t, isCompleted: data.isCompleted } : t)
        }))
      })
  }

  render() {
    const { todos } = this.state
    return (
      <div className="App">
        <Layout>
          <Layout.Content>
            <h1>Todo List</h1>
            <div className="card">
              <TodoList todos={todos} isCompletedDidChange={(todo, isCompleted) => this.updateTodoIsCompleted(todo, isCompleted)} />
            </div>
          </Layout.Content>
        </Layout >
      </div >
    );
  }
}

export default App;
