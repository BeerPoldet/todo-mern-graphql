
export default (fetch, body) =>
  fetch('http://localhost:3000/graphql', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(result => result.data)