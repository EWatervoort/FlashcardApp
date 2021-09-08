import React, { useEffect, useState } from "react";
import { readDeck, readCard } from "../utils/api";
import CardForm from "../AddCard/CardForm";
import { Link, useParams, useHistory } from 'react-router-dom'

function EditCard () {
  const [deckInfo, setDeckInfo] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(params.deckId);
      setDeckInfo(response);
    }
    getDeck();
  }, [params])

  useEffect(() => {
    const getCard = async () => {
      const response = await readCard(params.cardId);
      setCardInfo(response);
    }
    getCard();
  }, [params])

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${params.deckId}`)
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <Link to={'/'}>
            <li className="breadcrumb-item">Home</li>
          </Link>
          <Link to={`/decks/${deckInfo.id}`}>
            <li className="breadcrumb-item">{`/ Deck ${deckInfo.name}`}</li>
          </Link>
          <li className="breadcrumb-item active" aria-current="page">{`/ Edit Card ${params.cardId}`}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm 
        frontInput={cardInfo.front}
        backInput={cardInfo.back}
        cardType={'edit'}
      />
      <button type="button" className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default EditCard 