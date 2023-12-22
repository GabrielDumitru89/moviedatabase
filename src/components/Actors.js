import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction5 } from "../slices/appSlices";
import ActorsCard from "./ActorsCard";
import Template from "./utilsView/Template";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

const Actors = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction5("/actors"));
	}, [dispatch]);

	const actorsData = useSelector((state) => state.app.actorData.data);
	// console.log(actorsData);
	return (
		<Template>
			<div>Actors</div>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={0}
				slidesPerView={5}
				initialSlide={1}
				navigation
				pagination={{ clickable: true }}
				style={{ width: "100%", height: "100%" }}
				// scrollbar={{ draggable: true }}
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
				{actorsData?.map((item, index) => (
					<SwiperSlide
						key={index}
						style={{ display: "flex", justifyContent: "center" }}
					>
						<ActorsCard item={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</Template>
	);
};

export default Actors;
