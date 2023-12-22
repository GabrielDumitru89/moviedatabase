import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction3 } from "../slices/appSlices";
import Card from "./Card";
import Template from "./utilsView/Template";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

const Movies = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			logInAction3(
				// "/titles?titleType=movie&startYear=1950&endYear=2023&limit=10"
				"/titles?info=custom_info&list=top_boxoffice_last_weekend_10"
			)
		);
	}, [dispatch]);

	const moviesData = useSelector((state) => state.app.movieData.data);
	// const dataSearch = useSelector((state) => state.app.searchedData.data);
	// console.log(moviesData);

	return (
		<Template>
			<div>Movies</div>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={0}
				slidesPerView={5}
				initialSlide={1}
				navigation
				pagination={{ clickable: true }}
				style={{ width: "100%", height: "100%" }}
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
				{moviesData?.map((item, index) => (
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

export default Movies;
