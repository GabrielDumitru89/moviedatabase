import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import Template from "./utilsView/Template";
import MovieDetail from "./MovieDetail";

const Movie = () => {
	const { id } = useParams();
	const condition = null;
	const movies = useSelector((state) => condition ? state.app.movieData.data : state.app.topRatedM.data);
	// console.log(movies);
	const dataSingleMovie = movies.filter((item, index) => item.id === id);

	return (
		<div>
			<NavBar />
			<Template>
				{dataSingleMovie?.map((item, index) => (
					<MovieDetail key={index} item={item} />
				))}
			</Template>
		</div>
	);
};

export default Movie;
