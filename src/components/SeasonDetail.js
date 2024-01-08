import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oneSeasonData } from "../slices/appSlices";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

const SeasonDetail = () => {
	const { seriesId, seasonNumber } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(oneSeasonData({ seriesId, seasonNumber }));
	}, [dispatch, seriesId, seasonNumber]);

	// const seasonData = useSelector((state) => state.app.oneSeasonData);
	const seasonData = useSelector((state) => state.app.seasonData.data);
	// console.log(seasonData);

	return (
		<div>
			<div>
				<img
					src={`https://image.tmdb.org/t/p/w200${seasonData?.poster_path}`}
					alt={seasonData?.name}
				/>
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
			<div className="episode-container">
				{seasonData?.episodes.map((episode) => (
					<div
						key={episode.id}
						className="episode"
						onClick={() =>
							navigate(
								`/tv/${seriesId}/season/${seasonData?.season_number}/episode/${episode.episode_number}`
							)
						}
					>
						<h3>{episode.name}</h3>
						<img
							src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
							alt={episode.name}
						/>
						<p>{episode.overview}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SeasonDetail;
