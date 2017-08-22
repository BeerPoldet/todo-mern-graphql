import React from 'react'
import CheckBox from 'antd/lib/checkbox'
import Row from 'antd/lib/row'

export default ({ todo, isCompletedDidChange }) => (
  <Row key={todo.title}>
    <CheckBox checked={todo.isCompleted} onChange={(event) => isCompletedDidChange(todo, event.target.checked)}>{todo.title}</CheckBox>
  </Row>
)