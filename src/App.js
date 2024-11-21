import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BingoCard from "./components/BingoCard";

function App() {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const CardWrapper = () => {
    const query = useQuery();
    const cardId = query.get("card");
    return <BingoCard cardId={cardId} />;
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
