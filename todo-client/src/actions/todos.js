export const FETCH_TODO_PENDING = 'FETCH_TODO_PENDING'
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'

export const createFetchTodos = fetch => () => async (dispatch) => {
  dispatch({ type: FETCH_TODO_PENDING })
  const todos = await apiFetch(fetch).fetchTodos()

  dispatch({
    type: FETCH_TODO_SUCCESS,
    data: todos
  })
}

const apiFetch = fetch => ({
  fetchTodos: () =>
    fetch('http://localhost:3000/todos')
      .then(res => res.json())
      .then(data => data.todos)
})