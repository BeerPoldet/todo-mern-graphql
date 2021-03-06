import { types } from '../actions/todos'

export default (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TODO_SUCCESS:
      return action.data
    case types.CREATE_TODO_SUCCESS:
      return [...state, action.data]
    case types.UPDATE_TODO_SUCCESS:
      return state.map(todo => todo.id === action.id ? action.data : todo)
    case types.DELETE_TODO_SUCCESS:
      return state.filter(todo => todo.id !== action.id)

    default:
      return state
  }
}