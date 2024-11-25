import React from "react";
import { useLocation } from "react-router-dom";

import BingoCard from "./BingoCard.tsx";

import cards from "../assets/cards.json";

function CardWrapper() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const cardId = query.get("card");

  if (!cardId) return <div>Error reading card id!</div>;

  const cardIndex = parseInt(cardId) % cards.length; // Wrap around for invalid card IDs
  const selectedCard = cards[cardIndex];

  return (
    <div className="App">
      <div className="card-container">
        <h1>Bingo Card nº {cardId}</h1>
        {selectedCard ? <BingoCard card={selectedCard} cardIndex={cardIndex} /> : <div>Error loading card!</div>}
      </div>
    </div>);
};

export default CardWrapper;