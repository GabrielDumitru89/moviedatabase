import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import Template from "./utilsView/Template";
import MediaDetail from "./MediaDetail";
// import MovieDetail from "./MovieDetail";
import { tvCreditsData1 } from "../slices/appSlices";

const Movie = () => {
	// console.log('Rendering ParentComponent');
	const { id } = useParams();
	const { mediaType } = useParams();
	// console.log('id:', id);
	// console.log(id);
	// const condition = null;
	// const movies = useSelector((state) => condition ? state.app.movieData.data : state.app.topRatedM.data);

	const movieData = useSelector((state) => state.app.movieData.data);
	const searchData = useSelector((state) => state.app.searchedData.data);
	const topRatedM = useSelector((state) => state.app.topRatedM.data);
	const bannerData = useSelector((state) => state.app.bannerData.data);
	// const movieCreditsData = useSelector(
	// 	(state) => state.app.movieCreditsData
	// );
	const movieCreditData = useSelector(
		(state) => state.app.movieCreditsData.cast
	);
	// console.log(movieCreditsData);

	const movies = [
		...(Array.isArray(movieData) ? movieData : []),
		...(Array.isArray(searchData) ? searchData : []),
		...(Array.isArray(topRatedM) ? topRatedM : []),
		...(Array.isArray(bannerData) ? bannerData : []),
		...(Array.isArray(movieCreditData) ? movieCreditData : []),
	];

	// console.log('MOvies', movies);
	const dataSingleMovie = movies.find((item, index) => {
		// console.log('URL param id:', id);
		// console.log('Movie id:', item.id);
		return Number(item.id) === Number(id);
	});
	// console.log("datasinglemovie", dataSingleMovie);
	// const mediaType = dataSingleMovie.title ? "movie" : "series";
	

	return (
		<div>
			<NavBar />
			<Template>
				{/* {dataSingleMovie && <MovieDetail item={dataSingleMovie} />} */}
				{dataSingleMovie && (
					<MediaDetail item={dataSingleMovie} mediaType="movie" />
				)}
			</Template>
		</div>
	);
};

export default Movie;
