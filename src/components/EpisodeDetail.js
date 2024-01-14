import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oneEpisodeData} from "../slices/appSlices";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Row from "./Row";

const EpisodeDetail = () => {

	const { seriesId, seasonNumber, episodeNumber } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// dispatch(oneEpisodeData({ seriesId, seasonNumber, episodeNumber }));
		dispatch(oneEpisodeData(`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`));
	}, [dispatch, seriesId, seasonNumber, episodeNumber]);

	const { episodeData, episodeCredits } = useSelector((state) => state.app);
	// console.log(episodeData);

	const director = episodeData?.crew?.find(
		(member) => member.job === "Director"
	);
	const writer = episodeData?.crew?.find((member) => member.job === "Writer");

	return (
		<div>
			<NavBar />
			{episodeData && (
				<div>
					<div>
						<img
							src={`https://image.tmdb.org/t/p/w1280${episodeData.still_path}`}
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
						{director && <p>Director: {director.name}</p>}
						{writer && <p>Writer: {writer.name}</p>}
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
					<Row items={episodeCredits?.cast} type="actor" />
				</div>
			)}
		</div>
	);
};

export default EpisodeDetail;
