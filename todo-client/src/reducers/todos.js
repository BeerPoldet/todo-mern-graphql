export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_TODO":
      return [...state, { title: "Walk the dog", isCompleted: false }];
    default:
      return state
  }
}