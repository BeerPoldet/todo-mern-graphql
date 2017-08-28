import React from 'react'
import { connect } from 'react-redux'
import TodoTitleInput from './TodoTitleInput'
import { createTodoCreator } from '../actions/todos'

const createTodo = createTodoCreator(fetch)

const CreateTodo = ({ createTodo }) => (
  <TodoTitleInput onSave={createTodo} isNewTodo />
)

export default connect(null, { createTodo })(CreateTodo)