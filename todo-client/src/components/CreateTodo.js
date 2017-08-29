import React from 'react'
import { connect } from 'react-redux'
import TodoTitleInput from './TodoTitleInput'
import { createTodo } from '../actions/todos'

const CreateTodo = ({ createTodo }) => {
  const handleSave = text => {
    if (text)
      createTodo(text)
  }
  return (
    <TodoTitleInput onSave={handleSave} isNewTodo />
  )
}

export default connect(null, { createTodo })(CreateTodo)