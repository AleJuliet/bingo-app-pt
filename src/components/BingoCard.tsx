import React, { useState, useEffect, useRef } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

import { useSave } from "../hooks/useSave.ts";

import "./BingoCard.css";

export type Card = (number | null)[][];
export type CardMarked = boolean[][];

interface BingoCardProps {
  cardIndex: number;
  card: Card;
  onCardDeselect: () => void;
}

const BingoCard = ({ card, cardIndex, onCardDeselect }: BingoCardProps) => {
  const [marked, setMarked] = useState<CardMarked>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const { load, save } = useSave({ cardId: cardIndex, saveId: 0, });

  // Mounting hook
  useEffect(() => {
    // Initialize marked state (same structure as the card)
    const initialMarkedState = card.map((row) =>
      row.map((num) => false)
    );
    setMarked(initialMarkedState);

    // Attempt loading of saved state
    const savedState = load();
    if (savedState !== null) setMarked(savedState);
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save state on marking change
  useEffect(() => {
    if (!isLoading) save(marked);
  }, [isLoading, marked, save]);

  const toggleNumber = (rowIndex, colIndex) => {
    const updatedMarked = [...marked];
    updatedMarked[rowIndex][colIndex] = !updatedMarked[rowIndex][colIndex];
    setMarked(updatedMarked);
  };

  //Clears card array
  const clearCard = () => {
    if (window.confirm("Are you sure you want to clear the Bingo card?")) {
      const initialMarkedState = card.map((row) => row.map((num) => false));
      setMarked(initialMarkedState);
    }
  }

  //Uses the screenshot hook to download the image
  const download = (image, { name = "bingoWinnerCard", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  //Takes a screenshot of the card and downloads it
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div>
      <div className="bingo-card-wrapper">
        <div className="bingo-card" ref={ref}>
          {
            marked?.length ?
              card.map((row, rowIndex) => (
                <div key={rowIndex} className="bingo-row">
                  {row.map((num, colIndex) => (
                    <div
                      key={colIndex}
                      className={`bingo-cell ${marked[rowIndex][colIndex] ? "marked" : ""
                        } ${num ? "" : "empty"}`}
                      onClick={() => {
                        if (num) toggleNumber(rowIndex, colIndex);
                      }}
                    >
                      {num || ""}
                    </div>
                  ))}
                </div>
              ))
              : <div>loading</div>
          }
        </div>
      </div>
      <div className="bingo-buttons">
        <button onClick={clearCard}>Clear card</button>
        <button onClick={downloadScreenshot}>Download card image</button>
        {/*<button onClick={onCardDeselect}>Pick another card</button>*/
        }
      </div>
    </div>
  );
};

export default BingoCard;
