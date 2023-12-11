import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styles/MovieCard.module.scss";

const MovieCard = (item) => {

	const navigate = useNavigate();
	
	// console.log(item);
	
	return (
		<div onClick={() => navigate (`/titles/${item?.item?.id}/`)} className={styles.card}>
			<img
				src={item?.item?.primaryImage?.url}
				alt={item?.item?.primaryImage?.caption?.plainText}
			/>
			<h2>{item?.item?.titleText?.text}</h2>
			<p>{item?.item?.titleType?.text}</p>
			<p>{item?.item?.releaseYear?.year}</p>
		</div>
	);
};

export default MovieCard;
