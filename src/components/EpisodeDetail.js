import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
	oneEpisodeData,
	episodeImagesData,
	fetchEpisodeCredits,
} from "../slices/appSlices";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Row from "./Row";
import styles from "../styles/EpisodeDetail.module.scss";
import * as basicLightbox from "basiclightbox";
import MouseDrag from "./utilsFunctions/MouseDrag";

const EpisodeDetail = () => {
	const { seriesId, seasonNumber, episodeNumber } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			oneEpisodeData(
				`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`
			)
		);
	}, [dispatch, seriesId, seasonNumber, episodeNumber]);

	useEffect(() => {
		dispatch(
			episodeImagesData(
				`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`
			)
		);
	}, [dispatch, seriesId, seasonNumber, episodeNumber]);

	const episodeImages = useSelector(
		(state) => state.app.episodeImage?.data?.stills
	);
	// console.log("episodeImages", episodeImages);

	useEffect(() => {
		dispatch(
			fetchEpisodeCredits(
				`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits?language=en-US`
			)
		);
	}, [dispatch, seriesId, seasonNumber, episodeNumber]);

	const { episodeData, episodeCredits } = useSelector((state) => state.app);

	// console.log("episodeData", episodeData?.data);
	// console.log("episodeCredits",episodeCredits?.data);

	const director = episodeData?.data?.crew?.find(
		(member) => member.job === "Director"
	);
	const writer = episodeData?.data?.crew?.find(
		(member) => member.job === "Writer"
	);

	return (
		<div className={styles.episodeDetailContainer}>
			<NavBar />
			{/* {episodeData?.data && ( */}
			<div className={styles.episodeHeader}>
				<img
					className={styles.episodeBackdrop}
					src={`https://image.tmdb.org/t/p/w1280${episodeData?.data?.still_path}`}
					alt={episodeData?.data?.name}
				/>
				<div className={styles.episodeInfo}>
					<img
						className={styles.episodePoster}
						src={`https://image.tmdb.org/t/p/w500${episodeData?.data?.still_path}`}
						alt={episodeData?.data?.name}
					/>
					<div className={styles.episodeDetails}>
						<p className={styles.episodeTitle}>
							<strong>{episodeData?.data?.name}</strong>
						</p>
						<p>
							S {episodeData?.data?.season_number} E{" "}
							{episodeData?.data?.episode_number}
						</p>
						<p>
							<strong>Air Date:</strong> {episodeData?.data?.air_date}
						</p>
						<p>
							<strong>Runtime: </strong>
							{episodeData?.data?.runtime}
						</p>
						<p>
							<strong>Rating: </strong>
							{episodeData?.data?.vote_average}
						</p>
						<p className={styles.overview}>{episodeData?.data?.overview}</p>
						<div className={styles.director}>
							{director && <p>Director: {director.name}</p>}
							{writer && <p>Writer: {writer.name}</p>}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.episodeImagesContainer}>
				<div>
					<p>
						<strong>Images</strong>
					</p>
				</div>
				<div className={styles.episodeImages}>
					<MouseDrag elementClass={styles.episodeImages} />
					{episodeImages?.map((image, index) => (
						<div
							key={index}
							onClick={() => {
								const instance = basicLightbox.create(`
            <img src="https://image.tmdb.org/t/p/w1280${image.file_path}" width="800" height="600">
          `);
								instance.show();
							}}
						>
							<img
								src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
								alt=""
							/>
						</div>
					))}
				</div>
			</div>

			<div>
				<Row items={episodeCredits?.data?.cast} type="actor" />
			</div>
			{/* )} */}
		</div>
	);
};

export default EpisodeDetail;
