const asanaBackendURL = "https://asana-backend.herokuapp.com"
const usersIndex = "/users/"
const cardsIndex = "/cards/"
const cardContainer = document.querySelector('#card_container')
const selectorUserId = document.querySelector('#selector_user_id')

const handleResponse = (response) => {
  data = response.json()
  return data
}

const createCards = (cards) => {
  cards.forEach(
    card => {
      card = createCard(card)

      cardContainer.append(card)
})}

fetch(asanaBackendURL + usersIndex)
  .then(handleResponse)
  .then(users => users.forEach(
    user => {
      const option = document.createElement('option')

      option.value = user.id
      option.textContent = user.username

      selectorUserId.append(option)
  }))

fetch(asanaBackendURL + cardsIndex)
  .then(handleResponse)
  .then(createCards)

const createCard = (card) => {
  div = createDiv()
  h3 = createCardName(card)
  p = createCardDescription(card)
  const deleteLink = document.createElement('a')
  const updateLink = document.createElement('a')

  deleteLink.href = `https://asana-backend.herokuapp.com/cards/${card.id}`
  deleteLink.textContent = "Delete"
  deleteLink.classList.add('font-normal','inline-block','pt-2','text-sm')
  updateLink.href = `https://asana-backend.herokuapp.com/cards/${card.id}`
  updateLink.textContent = "Update"
  updateLink.classList.add('font-normal','inline-block','pt-2','pl-2','text-sm')

  div.append(h3, p, deleteLink, updateLink)

  return div
}

const createDiv = () => {
  const div = document.createElement('div')
  div.classList.add('card','p-6')
  return div
}

const createCardName = (card) => {
  const h3 = document.createElement('h3')
  h3.textContent = card.name
  div.classList.add('font-bold')
  return h3
}

const createCardDescription = (card) => {
  const p = document.createElement('p')
  p.textContent = card.description
  p.classList.add('text-sm','pt-1', 'font-normal')
  return p
}