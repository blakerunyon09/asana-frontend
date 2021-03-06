const asanaBackendURL = "https://asana-backend.herokuapp.com"
const usersIndex = "/users/"
const cardsIndex = "/cards/"
const body = document.querySelector('body')
const cardList = document.querySelector('#cards')

fetch(asanaBackendURL + usersIndex)
  .then(response => response.json())
  .then(users => users.forEach(
    user => {
    const h1 = document.createElement('h1')

    h1.textContent = user.username

    body.append(h1)
  }))

fetch(asanaBackendURL + cardsIndex)
  .then(response => response.json())
  .then(cards => cards.forEach(
    card => {
      const p = document.createElement('p')
      const p2 = document.createElement('p')

      p.textContent = card.name
      p2.textContent = card.description

      cardList.append(p, p2)
    }))