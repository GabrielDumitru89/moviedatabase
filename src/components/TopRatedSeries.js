import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topRatedSeries } from "../slices/appSlices";
import Card from "./Card";
import Template from "./utilsView/Template";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

const TopRatedSeries = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(topRatedSeries("/tv/top_rated?language=en-US&page=1"));
	}, [dispatch]);

	const tvSeriesData = useSelector((state) => state.app.topRatedS.data);
	// console.log(tvSeriesData);
	return (
		<Template>
			<div>Top Rated Series</div>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={0}
				// centeredSlides={true}
				slidesPerView={5}
				initialSlide={1}
				navigation
				pagination={{ clickable: true, dynamicBullets: true }}
				breakpoints={{
					320: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 3,
					},
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

export default TopRatedSeries;
