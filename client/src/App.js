import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentWillMount() {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{ todos { title } }`
      })
    })
      .then(res => res.json())
      .then(({ data }) => {
        this.setState(data)
      })
  }

  render() {
    const { todos } = this.state
    return (
      <div className="App">
        <ul>
          {todos.map(todo => <li key={todo.title}><strong>{todo.title}</strong><div>{todo.isCompleted}</div></li>)}
        </ul>
      </div>
    );
  }
}

export default App;
