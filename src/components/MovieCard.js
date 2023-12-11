import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styles/MovieCard.module.scss";
const MovieCard = ({ item }) => {

	const navigate = useNavigate();

	return (
		<div onClick={() => navigate(`/titles/${item?.id}/`)} className={styles.card}>
			{item?.primaryImage?.url ? <img
				src={item?.primaryImage?.url}
				alt={item?.primaryImage?.caption?.plainText}
			/> : <div style={{ width: 400, height: 600, background: '#000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 24 }}>NO IMAGE</div>}

			<h2>{item?.titleText?.text}</h2>
			<p>{item?.titleType?.text}</p>
			<p>{item?.releaseYear?.year}</p>
		</div>
	);
};

export default MovieCard;
