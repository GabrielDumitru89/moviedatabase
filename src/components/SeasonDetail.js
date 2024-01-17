import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oneSeasonData, seasonImagesData } from "../slices/appSlices";
import { useEffect } from "react";
import Row from "./Row";
import NavBar from "./NavBar";
import styles from "../styles/SeasonDetail.module.scss";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import MouseDrag from "./utilsFunctions/MouseDrag";

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
	// console.log("season",seasonData);

	useEffect(() => {
		dispatch(seasonImagesData(`/tv/${seriesId}/season/${seasonNumber}/images`));
	}, [dispatch, seriesId, seasonNumber]);

	const seasonImages = useSelector(
		(state) => state.app.seasonImage?.data?.posters
	);
	// console.log("seasonImages", seasonImages);

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
						<p className={styles.seasonTitle}>
							<strong>{seasonData?.name}</strong>
						</p>
						<div className={styles.releaseAndGenres}>
							<p>
								<strong>Air Date: </strong>
								{seasonData?.air_date}
							</p>
							<p>
								<strong>Rating: </strong> {seasonData?.vote_average}
							</p>
						</div>
						<p className={styles.overview}>{seasonData?.overview}</p>
					</div>
				</div>
			</div>
			<div className={styles.seasonImagesContainer}>
				<div>
					<p>
						<strong>Images</strong>
					</p>
				</div>
				<div className={styles.seasonImages}>
					<MouseDrag elementClass={styles.seasonImages} />
					{seasonImages &&
						seasonImages.map((image, index) => (
							<div
								key={index}
								onClick={() => {
									const instance = basicLightbox.create(`
            <img src="https://image.tmdb.org/t/p/original${image.file_path}" width="800" height="600">
          `);
									instance.show();
								}}
							>
								<img
									src={`https://image.tmdb.org/t/p/original${image.file_path.trim()}`}
									alt=""
								/>
							</div>
						))}
				</div>
			</div>
			<div className={styles.episodes}>
				<p>
					<strong>Episodes</strong>
				</p>
				<Row items={seasonData?.episodes} type="episode" seriesId={seriesId} />
			</div>
		</div>
	);
};

export default SeasonDetail;
