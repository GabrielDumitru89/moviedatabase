import React from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import styles from "../styles/Card.module.scss";

const Card = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/titles/${item?.id}/`)}
			className={styles.card}
		>
			<div>
				{item?.primaryImage?.url ? (
					<div>
						<img
							src={item?.primaryImage?.url}
							alt={item?.primaryImage?.caption?.plainText}
						/>
					</div>
				) : (
					<div>
						<img src="/images/image-not-found.png" alt="" />
					</div>
				)}
			</div>
			<div className={styles.title}>
				<h3>{item?.titleText?.text}</h3>
			</div>
			{/* <p>{item?.titleType?.text}</p> */}
			<div className={styles.year}>
				<p>{item?.releaseYear?.year}</p>
			</div>
		</div>
	);
};

export default Card;
