const asanaBackendURL = "https://asana-backend.herokuapp.com"
const usersIndex = "/users/"
const body = document.querySelector('body')

fetch(asanaBackendURL + usersIndex)
  .then(response => response.json())
  .then(users => users.forEach(
    user => {
    const h1 = document.createElement('h1')

    h1.textContent = user.username

    body.append(h1)
  }))