export const types = {
  FETCH_TODO_PENDING: 'FETCH_TODO_PENDING',
  FETCH_TODO_SUCCESS: 'FETCH_TODO_SUCCESS'
}

export const createFetchTodos = fetch => () => async (dispatch) => {
  dispatch({ type: types.FETCH_TODO_PENDING })
  dispatch({
    type: types.FETCH_TODO_SUCCESS,
    data: await apiFetch(fetch).fetchTodos()
  })
}

const apiFetch = fetch => ({
  fetchTodos: () =>
    fetch('http://localhost:3000/todos')
      .then(res => res.json())
      .then(data => data.todos)
})