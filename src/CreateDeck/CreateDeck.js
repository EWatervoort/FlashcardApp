import React from "react"
import { Link, useHistory } from 'react-router-dom'
import DeckForm from "./DeckForm"

function CreateDeck () {
  const history = useHistory();
  const handleCancel = (event) => {
    event.preventDefault();
    history.push('/')
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <Link to={'/'}>
            <li class="breadcrumb-item">Home</li>
          </Link>
          <li class="breadcrumb-item active" aria-current="page">\ Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm descriptionInput={"Brief description of the deck"} nameInput={"Deck Name"} deckType={'create'}/>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default CreateDeck