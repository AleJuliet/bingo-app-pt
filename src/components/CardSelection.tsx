import React, { useEffect, useState } from "react";

import "./CardSelection.css";
import cards from "../assets/cards.json";

export interface CardSelectionProps {
  onCardSelect: (cardIndex: number) => void;
}

const cardIndexes = [...Array(cards.length + 1).keys()].slice(1);

function CardSelection({ onCardSelect }: CardSelectionProps) {
  const [saves, setSaves] = useState<Array<string>>();

  useEffect(() => {
    const saves = Object.keys(localStorage).map((k) => k.split('-')[0]);
    //console.log(saves);
    setSaves(saves);
    
  }, []);

  return (
    <div className="card-selection">
      <p className="card-selection-title">Please select a bingo card!</p>
      <div className="selection-container">
        {cardIndexes.map((n) => 
          (<input
            type="button" key={n}
            className={`card-select${saves?.includes(n.toString()) ? ' has-save' : ''}`}
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