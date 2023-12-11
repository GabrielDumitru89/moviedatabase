import React from "react";
import Home from "./components/Home";
import { Routes, Route } from 'react-router-dom'
import Search from "./components/Search";
import Movie from "./components/Movie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/titles/:id" element={<Movie/>} />
      <Route path="/search/:name" element={<Search />} />
      <Route path="/" />
    </Routes>
  );
}

export default App;
