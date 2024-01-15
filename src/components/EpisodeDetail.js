import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oneEpisodeData, imagesData,fetchEpisodeCredits } from "../slices/appSlices";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Row from "./Row";
import styles from "../styles/EpisodeDetail.module.scss";
import * as basicLightbox from "basiclightbox";

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
				imagesData(
					`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images?language=en-US`
				)
			);
		}, [dispatch, seriesId, seasonNumber, episodeNumber]);

		useEffect(() => {
			dispatch( fetchEpisodeCredits(`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits?language=en-US`));
		}, [dispatch, seriesId, seasonNumber, episodeNumber]);
	
		const { episodeData, episodeCredits } = useSelector((state) => state.app);
		const images = useSelector((state) => state.app.imageData?.data);

		// console.log("episodeData",episodeData?.data);
		// console.log("episodeCredits",episodeCredits?.data);

	const director = episodeData?.data?.crew?.find(
		(member) => member.job === "Director"
	);
	const writer = episodeData?.data?.crew?.find((member) => member.job === "Writer");

	return (
		<div>
			<NavBar />
			{episodeData?.data && (
				<div>
					<div>
						<img
							src={`https://image.tmdb.org/t/p/w1280${episodeData?.data.still_path}`}
							alt={episodeData?.data.name}
						/>
					</div>
					<div>
					<img
							src={`https://image.tmdb.org/t/p/w200${episodeData?.data.still_path}`}
							alt={episodeData?.data.name}
						/>	
					</div>
					<div>
						<h2>{episodeData?.data.name}</h2>
					</div>
					<div>
						<p>Overview: {episodeData?.data.overview}</p>
					</div>
					<div>
						<p>Air Date: {episodeData?.data.air_date}</p>
					</div>
					<div>
						{director && <p>Director: {director.name}</p>}
						{writer && <p>Writer: {writer.name}</p>}
					</div>
					<div>
						<p>
							S {episodeData?.data.season_number} E {episodeData?.data.episode_number}
						</p>
					</div>
					<div>
						<p>Runtime: {episodeData?.data.runtime}</p>
					</div>
					<div>
						<p>Rating {episodeData?.data.vote_average}</p>
					</div>
					<div>
						<p>Vote Count: {episodeData?.data.vote_count}</p>
					</div>
					<div className={styles.mediaImages}>
					{images?.backdrops?.map((image, index) => (
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
					<div>
						<Row items={episodeCredits?.data?.cast} type="actor" />
					</div>
				</div>
			)}
		</div>
	);
};

export default EpisodeDetail;
