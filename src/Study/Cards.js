import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { listCards } from "../utils/api";


function Cards() {
  const [cardList, setCardList] = useState([])
  const [currentCard, setCurrentCard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false)
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const getCardList = async () => {
      const response = await listCards(params.deckId)
      setCardList(response);
      setCurrentCard(response[0])
    }
    getCardList();
  }, [params])

  function nextCard () {
    if (currentIndex < cardList.length-1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setCurrentCard(cardList[nextIndex]);
      setFlip(false)
    }

    if (currentIndex === cardList.length-1) {
      if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
        setCurrentIndex(0);
        setCurrentCard(cardList[0]);
        setFlip(false);
      } else {
        history.push('/')
      }
    }
  }

  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">{ flip ? currentCard.back : currentCard.front }</p>
          <button type='button' onClick={() => setFlip(!flip)}>Flip</button>
          { flip && <button onClick={nextCard}>Next</button> }
        </div>
      </div>
    </div>
  )
}

export default Cards