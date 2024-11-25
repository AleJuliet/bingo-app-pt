import React from "react";
import { useLocation } from "react-router-dom";
import BingoCard from "./BingoCard";

function CardWrapper() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const cardId = query.get("card");

  if (cardId === undefined) return <div>Error reading card id!</div>;

  return (
    <div className="App">
      <div className="card-container">
        <h1>Bingo Card nº {cardId}</h1>
        <BingoCard cardId={cardId} />
      </div>
    </div>);
};

export default CardWrapper;