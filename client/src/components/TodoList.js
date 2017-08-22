import React from 'react'
import Todo from './Todo'
import styled from 'styled-components'

const TodoList = ({ todos, isCompletedDidChange, className }) => (
  <div className={className}>
    {todos.map(todo => <Todo key={todo.title} todo={todo} isCompletedDidChange={isCompletedDidChange} />)}
  </div>
)

export default styled(TodoList)`
  background-color: #ffffff;
  min-width: 420px;
  max-width: 800px;
  padding: 24px;
  border-radius: 16px;
  border-width: 1px;
  border-color: #dddddd;
  border-style: solid;
`