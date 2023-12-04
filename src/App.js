import React from "react";
import Home from "./components/Home";
import { Routes, Route } from 'react-router-dom'
import Search from "./components/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:name" element={<Search />} />
    </Routes>
  );
}

export default App;
