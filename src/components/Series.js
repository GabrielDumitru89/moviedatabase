import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction4 } from "../slices/appSlices";
import Card from "./Card";
import Template from "./utilsView/Template";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

const Series = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			logInAction4(
				"/titles?titleType=tvSeries&endYear=2023&startYear=1980&sort=year.decr&info=custom_info"
				// "/titles?list=top_rated_series_250&info=custom_info&sort=year.decr"
			)
		);
	}, [dispatch]);

	const tvSeriesData = useSelector((state) => state.app.seriesData.data);
	// console.log(tvSeriesData);
	return (
		<Template>
			<div>Series</div>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={0}
				// centeredSlides={true}
				slidesPerView={5}
				initialSlide={1}
				navigation
				pagination={{ clickable: true }}
				style={{ width: "100%", height: "100%" }}
				// scrollbar={{ draggable: true }}
				breakpoints={{
					// Small screens
					320: {
						slidesPerView: 1,
					},
					// Medium screens
					768: {
						slidesPerView: 3,
					},
					// Large screens
					1024: {
						slidesPerView: 5,
					},
				}}
			>
				{tvSeriesData?.map((item, index) => (
					<SwiperSlide
						key={index}
						style={{ display: "flex", justifyContent: "center" }}
					>
						<Card item={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</Template>
	);
};

export default Series;
