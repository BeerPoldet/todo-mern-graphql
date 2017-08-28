import React from 'react'
import TodoTitleInput from './TodoTitleInput'
import classnames from 'classnames'

export default class Todo extends React.Component {
  state = {
    isEditing: false
  }

  handleEdit = e => {
    this.setState({ isEditing: true })
  }

  handleSave = title => {
    const { todo, titleDidChange } = this.props
    titleDidChange(todo.id, title)
    this.setState({ isEditing: false })
  }

  render() {
    const { todo: { id, title, isCompleted }, isCompletedDidChange, todoWillDelete } = this.props
    let element
    if (this.state.isEditing) {
      element = (
        <TodoTitleInput title={title} 
          onSave={this.handleSave}
          isEditing={this.state.isEditing} />
      )
    } else {
      element = (
        <div className="view">
          <input type="checkbox"
            className="toggle"
            checked={isCompleted}
            onChange={e => isCompletedDidChange(id, !isCompleted)} />
          <label onDoubleClick={this.handleEdit}>{title}</label>
          <button className="destroy" onClick={() => todoWillDelete(id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        'editing': this.state.isEditing
      })} key={id}>
        {element}
      </li>
    )
  }
}