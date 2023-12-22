import React from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Movie from "./components/Movie";
import Actor from "./components/Actor";
import SingleSeries from "./components/SingleSeries";
import NavBar from "./components/NavBar";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/titles/:id"
				element={
					<>
						<Movie />
						<SingleSeries />
					</>
				}
			/>
			<Route path="/search/:name" element={<Search />} />
			<Route path="/actors/:id" element={<Actor />} />
		</Routes>
	);
}

export default App;
