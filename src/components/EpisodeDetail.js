import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oneEpisodeData, oneSeasonData } from "../slices/appSlices";
import { useEffect } from "react";

const EpisodeDetail = () => {
	const { seriesId, seasonNumber, episodeNumber } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(oneEpisodeData({ seriesId, seasonNumber, episodeNumber }));
	}, [dispatch, seriesId, seasonNumber, episodeNumber]);

	// const episodeData = useSelector((state) => state.app.oneEpisodeData?.data);
	const { episodeData } = useSelector((state) => state.app);
	console.log(episodeData);

	return (
		<div>
			{episodeData && (
				<div>
					<div>
						<img
							src={`https://image.tmdb.org/t/p/w500${episodeData.still_path}`}
							alt={episodeData.name}
						/>
					</div>
					<div>
						<h2>{episodeData.name}</h2>
					</div>
					<div>
						<p>Overview: {episodeData.overview}</p>
					</div>
					<div>
						<p>Air Date: {episodeData.air_date}</p>
					</div>
					<div>
						<p>
							S {episodeData.season_number} E {episodeData.episode_number}
						</p>
					</div>
					<div>
						<p>Runtime: {episodeData.runtime}</p>
					</div>
					<div>
						<p>Rating {episodeData.vote_average}</p>
					</div>
					<div>
						<p>Vote Count: {episodeData.vote_count}</p>
					</div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
		</div>
	);
};

export default EpisodeDetail;
