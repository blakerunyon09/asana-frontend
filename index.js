const asanaBackendURL = "https://asana-backend.herokuapp.com"
// const asanaBackendURL = "http://localhost:3000"
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

  // deleteLink.href = `${asanaBackendURL}/cards/${card.id}`
  deleteLink.textContent = "Delete"
  deleteLink.classList.add('font-normal','inline-block','pt-2','text-sm')
  updateLink.id = `update_${card.id}`
  updateLink.textContent = "Update"
  updateLink.classList.add('font-normal','inline-block','pt-2','pl-2','text-sm')
  deleteLink.addEventListener('click', (e) => {
    e.target.parentNode.remove()

    fetch(`${asanaBackendURL}/cards/${card.id}`,{
      method: 'DELETE'
    })
      
  })
  updateLink.addEventListener('click', (e) => {
    const updateButton = document.querySelector(`#update_${card.id}`)
    const hasUpdateForm = document.querySelector('#update_form')
    if(hasUpdateForm){
      hasUpdateForm.remove()
      updateButton.textContent = "Update"
    } else{
    updateButton.textContent = "Cancel"
    const formDiv = document.createElement('div')
    formDiv.id = "update_form"

    formDiv.innerHTML = `
      <input type="text" name="name" placeholder="Task Name" id="name_update" class="input">
      <input type="text" name="description" placeholder="Describe Task" id="description_update" class="input">
      <select name="user_id" id="selector_user_id_update" class="px-1 rounded border-2 border-gray-500" id="id_update">
      </select>
      <input type="submit" value="Submit" class="px-1 rounded border-2 border-gray-500" id="update_submit">
    `
    e.target.parentNode.append(formDiv)

    const selectUpdate = document.querySelector('#selector_user_id_update')

    fetch(asanaBackendURL + usersIndex)
      .then(handleResponse)
      .then(users => users.forEach(
        user => {
          const option = document.createElement('option')

          option.value = user.id
          option.textContent = user.username

          selectUpdate.append(option)
      }))
    const updateSubmit = document.querySelector('#update_submit')
    updateSubmit.addEventListener('click', (e) => {
      const nameUpdate = document.querySelector('#name_update').value
      const descriptionUpdate = document.querySelector('#description_update').value
      const option = document.querySelector('option').value

      fetch(asanaBackendURL + cardsIndex + card.id + `?name=${nameUpdate}&description=${descriptionUpdate}&user_id=${option}`, {
        method: 'PATCH',
      }).then(response => response.json())

      e.target.parentNode.parentNode.querySelector('h3').textContent = nameUpdate
      e.target.parentNode.parentNode.querySelector('p').textContent = descriptionUpdate
      e.target.parentNode.remove()
      updateButton.textContent = "Update"

    })
    }
  })
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