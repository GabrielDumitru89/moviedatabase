import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ActorsCard.module.scss";

const ActorsCard = ({ item }) => {
	const navigate = useNavigate();

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
			<div>
				<p>Popularity: {item?.popularity}</p>
			</div>
		</div>
	);
};

export default ActorsCard;
