import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topRatedSeries } from "../slices/appSlices";
import Card from "./Card";
import Template from "./utilsView/Template";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import Row from "./Row";

const TopRatedSeries = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(topRatedSeries("/tv/top_rated?language=en-US&page=1"));
	}, [dispatch]);

	const topRatedSeriesData = useSelector((state) => state.app.topRatedS.data);
	// console.log(tvSeriesData);
	return (
		<Template>
			<div><p><strong>Top Rated Series</strong></p></div>
			<Row	items={topRatedSeriesData} />
		</Template>
	);
};

export default TopRatedSeries;
