import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Movies from "./Movies";
import Series from "./Series";
import Actors from "./Actors";
import TopRatedMovies from "./TopRatedMovies";
import TopRatedSeries from "./TopRatedSeries";
import Footer from "./Footer";
import Card from "./Card";

const Home = () => {
	return (
		<>
			<NavBar />
			<Banner />
			<Movies />
			<TopRatedMovies />
			<Series />
			<TopRatedSeries />
			<Actors />
			<Footer />
		</>
	);
};

export default Home;
