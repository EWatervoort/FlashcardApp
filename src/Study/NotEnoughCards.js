import React from "react"
import { Link, useParams } from 'react-router-dom'


function NotEnoughCards({ cardList, deckInfo }) {
  const deckLength = cardList.length
  const params = useParams()
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <Link to={'/'}>
            <li class="breadcrumb-item">Home</li>
          </Link>
          <Link to={`/decks/${deckInfo.id}`}>
            <li class="breadcrumb-item">{`/ ${deckInfo.name}`}</li>
          </Link>
            <li class="breadcrumb-item active" aria-current="page">/ Study</li>
        </ol>
      </nav>
      <h1>Study: {deckInfo.name}</h1>
      <h2>Not enough cards.</h2>
      <p>{`You need at least 3 cards to study. There are ${deckLength} cards in this`}</p>
      <Link to={`/decks/${params.deckId}/cards/new`}>
        <button type='button' className='btn btn-primary'>Add Cards</button>
      </Link>
    </>
  )
}

export default NotEnoughCards