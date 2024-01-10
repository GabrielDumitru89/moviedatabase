import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topRatedMovies } from "../slices/appSlices";
import Card from "./Card";
import Template from "./utilsView/Template";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import Row from "./Row";

const TopRatedMovies = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(topRatedMovies("/movie/top_rated?language=en-US&page=1"));
	}, [dispatch]);

	const topRatedMoviesData = useSelector((state) => state.app.topRatedM.data);
	// const dataSearch = useSelector((state) => state.app.searchedData.data);
	// console.log(moviesData);

	return (
		<Template>
			<div><p><strong>Top Rated Movies</strong></p></div>
			<Row items={topRatedMoviesData} />
		</Template>
	);
};

export default TopRatedMovies;
