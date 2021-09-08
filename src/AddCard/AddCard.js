import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const [deckInfo, setDeckInfo] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
     const getDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setDeckInfo(response);
      } catch(e) {
        console.log(e)
      }
      
    }
    getDeck();
    return () => {
      controller.abort()
    }
  }, [deckId])
  
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
          <li class="breadcrumb-item active" aria-current="page">/ Add Card</li>
        </ol>
      </nav>
      <h1><span>{deckInfo.name}</span>: <span>Add Card</span></h1>
      <CardForm frontInput={''} backInput={''} cardType={'add'} />
      <br />
      <Link to={`/decks/${deckId}`}>
        <button type="button" className="btn btn-secondary">Done</button>
      </Link>
    </div>
  )
};

export default AddCard