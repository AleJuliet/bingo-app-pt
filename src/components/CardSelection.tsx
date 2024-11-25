import React from "react";

export interface CardSelectionProps {
  onCardSelect: (cardIndex: number) => void;
}

const cardIndexes = [...Array(61).keys()].slice(1);

function CardSelection({ onCardSelect }: CardSelectionProps) {
  return (
    <div>
      <p>Please select a bingo card!</p>
      <select onChange={(e) => onCardSelect(parseInt(e.target.value))}>
        {cardIndexes.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
  )
  
}

export default CardSelection;