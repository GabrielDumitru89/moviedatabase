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
			{/* <Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={0}
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
				{topRatedMoviesData?.map((item, index) => (
					<SwiperSlide
						key={index}
						style={{ display: "flex", justifyContent: "center" }}
					>
						<Card item={item} />
					</SwiperSlide>
				))}
			</Swiper> */}
			<Row items={topRatedMoviesData} />
		</Template>
	);
};

export default TopRatedMovies;
