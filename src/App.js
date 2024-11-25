import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CardWrapper from "./components/CardWrapper.tsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardWrapper />}/>
      </Routes>
    </Router>
  );
}

export default App;
