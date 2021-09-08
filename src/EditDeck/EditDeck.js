import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import DeckForm from "../CreateDeck/DeckForm";
import { Link, useParams, useHistory } from 'react-router-dom'

function EditDeck() {
  const [deckInfo, setDeckInfo] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(params.deckId);
      setDeckInfo(response);
    }
    getDeck();
  }, [params])

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${params.deckId}`)
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <Link to={'/'}>
            <li class="breadcrumb-item">Home</li>
          </Link>
          <Link to={`/decks/${deckInfo.id}`}>
            <li class="breadcrumb-item">{`/ ${deckInfo.name}`}</li>
          </Link>
          <li class="breadcrumb-item active" aria-current="page">/ Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm 
        descriptionInput={deckInfo.description}
        nameInput={deckInfo.name}
        deckType={'edit'}
        deckId={deckInfo.id}
      />
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default EditDeck