import React, { useState, useEffect } from "react";
import "./BingoCard.css";
import cards from "../assets/cards.json";

const BingoCard = ({ cardId }) => {
  const [card, setCard] = useState([]);
  const [marked, setMarked] = useState([]);

  useEffect(() => {
    const cardIndex = parseInt(cardId) % cards.length; // Wrap around for invalid card IDs
    const selectedCard = cards[cardIndex];
    setCard(selectedCard);

    // Initialize marked state (same structure as the card)
    const initialMarkedState = selectedCard.map((row) =>
      row.map((num) => false)
    );
    setMarked(initialMarkedState);
  }, [cardId]);

  const toggleNumber = (rowIndex, colIndex) => {
    const updatedMarked = [...marked];
    updatedMarked[rowIndex][colIndex] = !updatedMarked[rowIndex][colIndex];
    setMarked(updatedMarked);
  };

  return (
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
  );
};

export default BingoCard;
