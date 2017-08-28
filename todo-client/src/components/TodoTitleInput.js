import React from 'react'
import classnames from 'classnames'

export default class TodoTitleInput extends React.Component {
  state = {
    title: this.props.title || ''
  }

  inputSubmit = e => {
    if (e.which === 13) {
      this.setState({ title: '' })
      this.props.onSave(e.target.value.trim())
    }      
  }

  inputChange = e => {
    this.setState({ title: e.target.value })
  }

  inputBlur = e => {
    const { isNewTodo, onSave } = this.props
    if (e.currentTarget.value.length > 0 && !isNewTodo)
      onSave(e.target.value.trim())
  }

  render() {
    const { isNewTodo, isEditing } = this.props
    return (
      <input
        type="text"
        value={this.state.title}
        className={classnames({
          'new-todo': isNewTodo,
          'edit': isEditing,
        })}
        onKeyDown={this.inputSubmit}
        onChange={this.inputChange}
        onBlur={this.inputBlur} />
    )
  }
}