import React from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import styles from "../styles/Card.module.scss";

const Card = ({ item }) => {
	const navigate = useNavigate();

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
							src={`https://image.tmdb.org/t/p/w500${
								item?.poster_path ? item.poster_path : item?.backdrop_path
							}`}
							alt={item?.title}
						/>
				) : (
						<img src="/images/image-not-found.png" alt="" />
				)}
			</div>
			<div className={styles.title}>
				<p>{item?.title || item?.name}</p>
			</div>
			<div className={styles.year}>
				<p>{item?.release_date || item?.first_air_date}</p>
			</div>
		</div>
	);
};

export default Card;
