import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom'
import { readDeck, listCards } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import Cards from "./Cards";

function Study() {
  const [deckInfo, setDeckInfo] = useState([]);
  const [cardList, setCardList] = useState([])
  const params = useParams();

  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(params.deckId);
      setDeckInfo(response);
    }
    getDeck();
  }, [params])

  useEffect(() => {
    const getCardList = async () => {
      const response = await listCards(params.deckId)
      setCardList(response);
    }
    getCardList();
  }, [params])

  const deckLength = cardList.length
  if (deckLength < 3) {
    return (
      <NotEnoughCards cardList={cardList} deckInfo={deckInfo}/>
    )
  }
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <Link to={'/'}>
            <li class="breadcrumb-item">Home</li>
          </Link>
          <Link to={`/decks/${deckInfo.id})`}>
            <li class="breadcrumb-item">{`/ ${deckInfo.name}`}</li>
          </Link>
          <li class="breadcrumb-item active" aria-current="page">/ Study</li>
        </ol>
      </nav>
      <h1>Study: {deckInfo.name}</h1>
      <Cards />
    </div>
  )
};

export default Study