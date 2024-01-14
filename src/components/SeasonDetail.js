import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oneSeasonData } from "../slices/appSlices";
import { useEffect } from "react";
import Row from "./Row";
import NavBar from "./NavBar";
import styles from "../styles/SeasonDetail.module.scss";

const SeasonDetail = () => {
	const { seriesId, seasonNumber } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			oneSeasonData(`/tv/${seriesId}/season/${seasonNumber}?language=en-US`)
		);
	}, [dispatch, seriesId, seasonNumber]);

	// const seasonData = useSelector((state) => state.app.oneSeasonData);
	const seasonData = useSelector((state) => state.app.seasonData.data);
	// console.log(seasonData);

	const posterUrl = seasonData?.poster_path
		? `https://image.tmdb.org/t/p/w1280${seasonData.poster_path}`
		: "default_image_url";

	return (
		<div className={styles.seasonDetailContainer}>
			<NavBar />

			<div className={styles.seasonHeader}>
				<img
					className={styles.seasonBackdrop}
					src={posterUrl}
					alt={seasonData?.name}
				/>

				<div className={styles.seasonInfo}>
					<img
						className={styles.seasonPoster}
						src={posterUrl}
						alt={seasonData?.name}
					/>
					<div className={styles.seasonDetails}>
						<h1 className={styles.seasonTitle}>{seasonData?.name}</h1>
						<div className={styles.releaseAndGenres}>
							<p>Air Date: {seasonData?.air_date}</p>
						</div>
						<p className={styles.overview}>{seasonData?.overview}</p>
					</div>
				</div>
			</div>
			<div className={styles.episodes}>
				<p><strong>Episodes</strong></p>
				<Row items={seasonData?.episodes} type="episode" seriesId={seriesId} />
			</div>
		</div>
	);
};

export default SeasonDetail;
