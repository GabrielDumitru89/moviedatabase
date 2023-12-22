import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ActorsCard.module.scss";

const ActorsCard = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/actors/${item.nconst}`)}
			className={styles.actorCard}
		>
			<div>
				<h2>{item?.primaryName}</h2>
			</div>
			<div>
				<img src={item?.primaryImage && item?.primaryImage.url} alt="" />
			</div>
			<div>
				<p>Birth Year: {item?.birthYear}</p>
			</div>
			<div>
				<p>Death Year: {item?.deathYear}</p>
			</div>
			<div>
				<p>Known For: {item?.knownForTitles}</p>
			</div>
			<div>
				<p>Profession: {item?.primaryProfession}</p>
			</div>
		</div>
	);
};

export default ActorsCard;
