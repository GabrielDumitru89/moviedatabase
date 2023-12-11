import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";
import Template from "./utilsView/Template";

const Movie = () => {
	const { id } = useParams();
	const movies = useSelector((state) => state.app.movieData.data);
	console.log(movies)
	const dataSingleMovie = movies.filter((item, index) => item.id === id);

	return (
		<div>
			<NavBar />
			<Template>
				{dataSingleMovie?.map((item, index) => (
					<MovieCard key={index} item={item} />
				))}
			</Template>
		</div>
	);
};

export default Movie;
