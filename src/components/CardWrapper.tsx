import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BingoCard, { Card } from "./BingoCard.tsx";
import CardSelection from "./CardSelection.tsx";

import cards from "../assets/cards.json";

function CardWrapper() {
  const [card, setCard] = useState<Card | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const cardId = parseInt(searchParams.get('cardId') || "0");

  useEffect(() => {
    if (cardId < 1 || cardId >= cards.length) {
      console.error(`Invalid cardId: ${cardId}`);
      setCard(null);
    } else {
      setCard(cards[cardId]);
    }
  }, [searchParams]);

  const onCardSelect = (cardId: number) => {
    setSearchParams({ 'cardId': cardId.toString() });
  }

  const onCardDeselect = () => setSearchParams();

  if (!card) return <CardSelection onCardSelect={onCardSelect}/>;

  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Europe/Paris'
  });

  return (
    <div className="App">
      <div className="card-container">
        <h1>Bingo Card nº <strong>{cardId}</strong> - {currentDate}</h1>
        <BingoCard card={card} cardIndex={cardId} onCardDeselect={onCardDeselect} />
      </div>
    </div>);
};

export default CardWrapper;