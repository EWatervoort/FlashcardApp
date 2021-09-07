import React, { useState, useEffect } from "react";
import { useHistory, useParams  } from 'react-router-dom'
import { createCard, updateCard } from "../utils/api";

function CardForm({ frontInput, backInput, cardType }) {
  const { deckId, cardId} = useParams();
  const initialCardState = {
    front: frontInput,
    back: backInput,
    id: cardId,
    deckId: deckId
  };
  const [cardData, setCardData] = useState({ ...initialCardState });

  useEffect(() => {
    setCardData({
      front: frontInput,
      back: backInput,
      id: cardId,
      deckId: deckId
    });
  }, [frontInput, backInput, cardId, deckId]);

  const handleChange = ({ target }) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cardType === 'add') {
      await createCard(deckId, cardData)
      setCardData({ ...initialCardState })
      history.go(0)
    } else if (cardType === 'edit') {
      console.log(cardData)
        await updateCard(cardData)
        setCardData({ ...initialCardState })
        history.push(`/decks/${deckId}`)
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Front">
        Front
        <br />
        <textarea
            id='front'
            name='front'
            onChange={handleChange}
            value={cardData.front}
            rows='5'
            required
            />
      </label>
      <br />
      <label htmlFor="back">
        Back
        <br />
          <textarea
            id='back'
            name='back'
            onChange={handleChange}
            value={cardData.back}
            rows='5'
            required
            />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  )
}

export default CardForm