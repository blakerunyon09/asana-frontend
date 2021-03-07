const asanaBackendURL = "https://asana-backend.herokuapp.com"
const usersIndex = "/users/"
const cardsIndex = "/cards/"
const cardContainer = document.querySelector('#card_container')

fetch(asanaBackendURL + cardsIndex)
  .then(response => response.json())
  .then(cards => cards.forEach(
    card => {
      const div = document.createElement('div')
      div.classList.add('card')
      
      const h3 = document.createElement('h3')
      h3.textContent = card.name
      div.classList.add('font-bold')
      div.append(h3)

      const p = document.createElement('p')
      p.textContent = card.description
      p.classList.add('text-sm','pt-1', 'font-normal')
      div.append(p)

      cardContainer.append(div)
    }))