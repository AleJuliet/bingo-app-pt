import React, { useState, useEffect } from "react";
import "./BingoCard.css";
import cards from "../assets/cards.json";

import { useSave } from "../hooks/useSave.ts";

const BingoCard = ({ cardId }) => {
  const [card, setCard] = useState([]);
  const [marked, setMarked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { load, save } = useSave({ cardId, saveId: 0, });

  // Mounting hook
  useEffect(() => {
    // Select card
    const cardIndex = parseInt(cardId) % cards.length; // Wrap around for invalid card IDs
    const selectedCard = cards[cardIndex];
    setCard(selectedCard);

    // Initialize marked state (same structure as the card)
    const initialMarkedState = selectedCard.map((row) =>
      row.map((num) => false)
    );
    setMarked(initialMarkedState);

    // Attempt loading of saved state
    const savedState = load();
    if (savedState !== null) setMarked(savedState);
    setIsLoading(false);
  }, []);

  // Save state on marking change
  useEffect(() => {
    if (!isLoading) save(marked);
  }, [marked]);

  const toggleNumber = (rowIndex, colIndex) => {
    const updatedMarked = [...marked];
    updatedMarked[rowIndex][colIndex] = !updatedMarked[rowIndex][colIndex];
    setMarked(updatedMarked);
  };

  const clearCard = () => {
    //
  }

  const copyToClipboard = () => {
    //
  }

  return (
    <div>
      <div className="bingo-card">
      {card.map((row, rowIndex) => (
        <div key={rowIndex} className="bingo-row">
          {row.map((num, colIndex) => (
            <div
              key={colIndex}
              className={`bingo-cell ${
                marked[rowIndex][colIndex] ? "marked" : ""
              } ${num ? "" : "empty"}`}
              onClick={() => {
                if (num) toggleNumber(rowIndex, colIndex);
              }}
            >
              {num || ""}
            </div>
          ))}
        </div>
      ))}
      </div>
      <div className="bingo-buttons">
        <button onClick={clearCard}>Clear card</button>
        <button onClick={copyToClipboard}>Copy to clipboard</button>
      </div>
    </div>
  );
};

export default BingoCard;
