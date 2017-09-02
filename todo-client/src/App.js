import React from 'react';
import './App.css';
import CreateTodo from './components/CreateTodo'
import TodoList from './components/TodoList'

const App = () => (
  <div className="todoapp">
    <div className="header">
      <h1>todos</h1>
      <CreateTodo />
    </div>
    <TodoList />
  </div >
);

export default App;
