import React from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "../styles/Swiper.scss";


const Row = ({ items, type, seriesId }) => {
	const data =
		type === "actors"
			? actorsData
			: type === "movies"
				? moviesData
				: type === "tv"
					? tvShowsData
					// : type="season"
					// ? seriesDetails
					// : type === 'episode'
					// ? seasonData
					: null;
	// console.log(data);

	return (
		<Swiper
			mousewheel={true}
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={0}
			slidesPerView={5}
			initialSlide={0}
			navigation
			pagination={{ clickable: true, dynamicBullets: true }}
			style={{ width: "auto" }}
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
			{items?.map((item, index) => (
				<SwiperSlide
					key={index}
					style={{ display: "flex", justifyContent: "center" }}
				>
					<Card item={item} type={type} seriesId={seriesId} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Row;
