import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BingoCard, { Card } from "./BingoCard.tsx";
import CardSelection from "./CardSelection.tsx";

import cards from "../assets/cards.json";

function CardWrapper() {
  const [cardId, setCardId] = useState<number | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const cardIdParam = searchParams.get('cardId');
    if (cardIdParam) {
      const cardIndex = parseInt(cardIdParam) % cards.length; // Wrap around for invalid card IDs
      setCardId(cardIndex);
      setCard(cards[cardIndex]);
    } else {
      setCardId(null);
      setCard(null);
    }
  }, [searchParams]);

  const onCardSelect = (cardId: number) => {
    setSearchParams({ 'cardId': cardId.toString() });
  }

  const onCardDeselect = () => setSearchParams();

  if (!cardId) return <CardSelection onCardSelect={onCardSelect}/>;

  return (
    <div className="App">
      <div className="card-container">
        <h1>Bingo Card nº {cardId}</h1>
        {card ? <BingoCard card={card} cardIndex={cardId} onCardDeselect={onCardDeselect} /> : <div>Error loading card!</div>}
      </div>
    </div>);
};

export default CardWrapper;