export const createMockStore = (reducer, initState) => {
  let state = initState
  let actions = []
  let states = []

  if (initState)
      states.push(initState)

  const getStates = () => states

  let dispatch = async (action) => {
    actions.push(action)

    if (reducer) {
      const nextState = reducer(state, action)
      states.push(nextState)
      state = nextState
      return nextState
    }

    return state
  }

  const getActions = () => actions

  const applyMiddlewares = (middlewares) => {
    middlewares.slice().reverse().forEach(middleware => dispatch = middleware(dispatch))
  }
  applyMiddlewares([mockThunk, mockPromise])

  return { dispatch, getStates, getActions }
}

export const mockThunk = next => action => {
  if (action instanceof Function) {
    return action(next)
  }
  return next(action)
}

export const mockPromise = next => action => {
  if (action.then && action.then instanceof Function) {
    return action.then(next)
  }
  return next(action)
}