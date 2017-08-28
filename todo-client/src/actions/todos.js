import TodoAPI from '../api/todo'

export const types = {
  FETCH_TODO_PENDING: 'FETCH_TODO_PENDING',
  FETCH_TODO_SUCCESS: 'FETCH_TODO_SUCCESS',

  CREATE_TODO_PENDING: 'CREATE_TODO_PENDING',
  CREATE_TODO_SUCCESS: 'CREATE_TODO_SUCCESS',

  UPDATE_TODO_PENDING: 'UPDATE_TODO_PENDING',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',

  DELETE_TODO_PENDING: 'DELETE_TODO_PENDING',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS'
}

export const fetchTodosCreator = listTodo => () => async dispatch => {
  dispatch({ type: types.FETCH_TODO_PENDING })
  dispatch({
    type: types.FETCH_TODO_SUCCESS,
    data: await listTodo()
  })
}

export const createTodoCreator = createTodo => title => async dispatch => {
  dispatch({ type: types.CREATE_TODO_PENDING })
  dispatch({
    type: types.CREATE_TODO_SUCCESS,
    data: await createTodo(title)
  })
}

export const updateTodoCreator = updateTodo => (id, partialTodo) => async dispatch => {
  dispatch({ type: types.UPDATE_TODO_PENDING })
  dispatch({
    type: types.UPDATE_TODO_SUCCESS,
    id,
    data: await updateTodo(id, partialTodo)
  })
}

export const deleteTodoCreator = fetch => id => async dispatch => {
  dispatch({ type: types.DELETE_TODO_PENDING }) 
  dispatch({ type: types.DELETE_TODO_SUCCESS, id })
}

export const fetchTodos = fetchTodosCreator(new TodoAPI(fetch).list)