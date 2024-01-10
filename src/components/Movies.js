import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction3 } from "../slices/appSlices";
import Row from "./Row";
import Card from "./Card";
import Template from "./utilsView/Template";

const Movies = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction3("/movie/popular?language=en-US&page=1"));
	}, [dispatch]);

	const moviesData = useSelector((state) => state.app.movieData.data);
	// const dataSearch = useSelector((state) => state.app.searchedData.data);
	// console.log(moviesData);

	return (
		<Template>
			<div><p><strong>Movies</strong></p></div>
				<Row items={moviesData} />
		</Template>
	);
};

export default Movies;
