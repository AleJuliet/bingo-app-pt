import React from "react";

import "./CardSelection.css";

export interface CardSelectionProps {
  onCardSelect: (cardIndex: number) => void;
}

const cardIndexes = [...Array(61).keys()].slice(1);

function CardSelection({ onCardSelect }: CardSelectionProps) {
  return (
    <div className="card-selection">
      <p className="card-selection-title">Please select a bingo card!</p>
      <div className="selection-container">
        {cardIndexes.map((n) => 
          (<input className="card-select" type="button" key={n}
            value={n} onClick={(e) => onCardSelect(parseInt((e.target as HTMLInputElement).value))}
          />)
        )}
      </div>
      {/* <select onChange={(e) => onCardSelect(parseInt(e.target.value))}>
        {cardIndexes.map((n) => <option key={n} value={n}>{n}</option>)}
      </select> */}
    </div>
  )
  
}

export default CardSelection;