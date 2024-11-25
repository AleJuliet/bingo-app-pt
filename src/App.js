import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BingoCard from "./components/BingoCard";
import "./App.css";

function App() {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const CardWrapper = () => {
    const query = useQuery();
    const cardId = query.get("card");
    if (cardId === undefined) <div>Error reading card id!</div>;
    return <div className="App"><div className="card-container">
        <h1>Bingo Card nº {cardId}</h1>
        <BingoCard cardId={cardId} />
      </div></div>;    
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardWrapper />}/>
      </Routes>
    </Router>
  );
}

export default App;
