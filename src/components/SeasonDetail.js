import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oneSeasonData } from "../slices/appSlices";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Row from "./Row";
import NavBar from "./NavBar";

const SeasonDetail = () => {
	const { seriesId, seasonNumber } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(oneSeasonData(`/tv/${seriesId}/season/${seasonNumber}?language=en-US`));
	}, [dispatch, seriesId, seasonNumber]);

	// const seasonData = useSelector((state) => state.app.oneSeasonData);
	const seasonData = useSelector((state) => state.app.seasonData.data);
	console.log(seasonData);

	const posterUrl = seasonData?.poster_path
		? `https://image.tmdb.org/t/p/w1280${seasonData.poster_path}`
		: "default_image_url";

	return (
		<div>
			<NavBar />
			<div>
				<img src={posterUrl} alt={seasonData?.name} />
			</div>
			<div>
				<h1>{seasonData?.name}</h1>
			</div>
			<div>
				<p>{seasonData?.overview}</p>
			</div>
			<div>
				<p>Air Date: {seasonData?.air_date}</p>
			</div>
			<Row items={seasonData?.episodes} type="episode" seriesId={seriesId} />
		</div>
	);
};

export default SeasonDetail;
