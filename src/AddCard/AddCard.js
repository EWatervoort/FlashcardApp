import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";


function AddCard() {
  const [deckInfo, setDeckInfo] = useState([]);
  const params = useParams();

  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(params.deckId);
      setDeckInfo(response);
    }
    getDeck();
  }, [params])
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
          <li class="breadcrumb-item active" aria-current="page">/ Add Card</li>
        </ol>
      </nav>
      <h1>{deckInfo.name}: Add Card</h1>
      <CardForm frontInput={''} backInput={''} cardType={'add'} />
      <br />
      <Link to={`/decks/${params.deckId}`}>
        <button type="button" className="btn btn-secondary">Done</button>
      </Link>
    </>
  )
};

export default AddCard