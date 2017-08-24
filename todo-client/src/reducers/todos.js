import { types } from '../actions/todos'

export default (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TODO_PENDING:
      return state;
    case types.FETCH_TODO_SUCCESS:
      return action.data
    
    default:
      return state
  }
}