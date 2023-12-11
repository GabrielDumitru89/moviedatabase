import React, { useEffect } from "react";
import NavBar from "./NavBar";
import MovieCard from "./MovieCard";
import Movies from "./Movies";

const Home = () => {
	return (
		<div>
			<NavBar />
			<Movies />
		</div>
	);
};

export default Home;
