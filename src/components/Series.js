import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction4 } from "../slices/appSlices";
import Card from "./Card";
import Template from "./utilsView/Template";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import Row from "./Row";

const Series = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction4("/tv/popular?language=en-US&page=1"));
	}, [dispatch]);

	const tvSeriesData = useSelector((state) => state.app.seriesData.data);
	// console.log(tvSeriesData);
	return (
		<Template>
			<div><p><strong>Series</strong></p></div>
			<Row items={tvSeriesData} />
		</Template>
	);
};

export default Series;
