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
			{item?.primaryImage?.url ? (
				<img
					src={item?.primaryImage?.url}
					alt={item?.primaryImage?.caption?.plainText}
				/>
			) : (
				<div
					style={{
						width: 200,
						height: "auto",
						background: "#000",
						color: "#fff",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center",
						fontSize: 24,
					}}
				>
					<img src="/images/image-not-found.png" alt=""/>
				
				</div>
			)}
				
			<h3>{item?.titleText?.text}</h3>
			{/* <p>{item?.titleType?.text}</p> */}
			<p>{item?.releaseYear?.year}</p>
			
		</div>
	);
};

export default Card;
