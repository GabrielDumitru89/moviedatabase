import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Card.module.scss";

const Card = ({ item, type, seriesId }) => {
	const navigate = useNavigate();
	// console.log(item);

	if (type === "actor") {
		return (
			<div
				onClick={() => navigate(`/person/${item.id}`)}
				className={styles.actorCard}
			>
				<div>
					<img
						src={
							item?.profile_path
								? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
								: ""
						}
						alt={item?.name}
					/>
				</div>
				<div>
					<p>{item?.name}</p>
				</div>
				{item?.roles && item.roles[0] && (
					<div>
						<p>Character: {item.roles[0].character}</p>
					</div>
				)}
				{item?.total_episode_count && (
					<div>
						<p>Episodes: {item.total_episode_count}</p>
					</div>
				)}
			</div>
		);
	}

	if (type === "season") {
		return (
			<div
				// onClick={() =>
				// 	navigate(`/series/${item.id}/season/${item.season_number}`)
				// }
				onClick={() =>
					navigate(`/series/${seriesId}/season/${item.season_number}`)
				}
				className={styles.card}
			>
				<div className={styles.img}>
					<img
						src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
						alt={item.name}
					/>
				</div>
				<div className={styles.title}>
					<p>
						<strong>{item.name}</strong>
					</p>
				</div>
				<div className={styles.year}>
					<p>Episodes: {item.episode_count}</p>
					<p>Air Date: {item.air_date}</p>
				</div>
			</div>
		);
	}

	if (type === "episode") {
		return (
			<div
				className={styles.episodeCard}
				onClick={() =>
					navigate(
						`/tv/${seriesId}/season/${item?.season_number}/episode/${item.episode_number}`
					)
				}
			>
				<div className={styles.img}>
					<img
						src={`https://image.tmdb.org/t/p/w200/${item.still_path}`}
						alt={item.name}
					/>
				</div>
				<div className={styles.title}>
					<p>
						<strong>{item.name}</strong>
					</p>
				</div>
				<div className={styles.year}>
					<p>Air Date: {item.air_date}</p>
				</div>
			</div>
		);
	}

	return (
		<div
			onClick={() => {
				if (item.title) {
					navigate(`/movie/${item.id}?language=en-US`);
				} else if (item.name) {
					navigate(`/tv/${item.id}?language=en-US`);
				}
			}}
			className={styles.card}
		>
			<div className={styles.img}>
				{item?.poster_path ? (
					<img
						src={`https://image.tmdb.org/t/p/w200${
							item?.poster_path ? item.poster_path : item?.backdrop_path
						}`}
						alt={item?.title}
					/>
				) : (
					<img src="/images/image-not-found.png" alt="" />
				)}
			</div>
			<div className={styles.title}>
				<p>
					<strong>{item?.title || item?.name}</strong>
				</p>
			</div>
			<div className={styles.year}>
				<p>{item?.release_date || item?.first_air_date}</p>
			</div>
			{/* {type === "tv" && item?.seasons && (
				<div>
					<p>Episodes: {item.seasons[0]?.episode_count}</p>
					<p>Air Date: {item.seasons[0]?.air_date}</p>
				</div>
			)} */}
		</div>
	);
};

export default Card;
