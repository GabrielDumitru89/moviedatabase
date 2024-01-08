import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SearchCard.module.scss";

const SearchCard = ({ item }) => {
	const navigate = useNavigate();
	// console.log(item);
	const handleItemClick = (mediaType, id) => {
		navigate(`/${mediaType}/${id}`);
	};

	if (item?.media_type === "movie") {
		return (
			<div
				className={styles.card}
				onClick={() => handleItemClick(item?.media_type, item?.id)}
			>
				<div className={styles.imageContainer}>
					{item?.poster_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
							alt={item?.title}
							className={styles.image}
						/>
					) : (
						<img
							src="/images/image-not-found.png"
							alt=""
							className={styles.image}
						/>
					)}
				</div>
				<div>
					<div className={styles.title}>
						<p>
							<strong>{item?.title}</strong>
						</p>
					</div>
					<div className={styles.overview}>
						<p>{item?.overview}</p>
					</div>
				</div>
			</div>
		);
	} else if (item?.media_type === "tv") {
		return (
			<div
				className={styles.card}
				onClick={() => handleItemClick(item?.media_type, item?.id)}
			>
				<div className={styles.imageContainer}>
					{item?.poster_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
							alt={item?.name}
							className={styles.image}
						/>
					) : (
						<img
							src="/images/image-not-found.png"
							alt=""
							className={styles.image}
						/>
					)}
				</div>
				<div>
					<div className={styles.title}>
						<p>
							<strong>{item?.name}</strong>
						</p>
					</div>
					<div className={styles.overview}>
						<p>{item?.overview}</p>
					</div>
				</div>
			</div>
		);
	} else if (item?.media_type === "person") {
		// Display person item?
		return (
			<div
				className={styles.card}
				onClick={() => handleItemClick(item?.media_type, item?.id)}
			>
				<div className={styles.imageContainer}>
					{item?.profile_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
							alt={item?.name}
							className={styles.image}
						/>
					) : (
						<img
							src="/images/image-not-found.png"
							alt=""
							className={styles.image}
						/>
					)}
				</div>
				<div>
					<div className={styles.title}>
						<p>
							<strong>{item?.name}</strong>
						</p>
					</div>
					<div className={styles.overview}>
						<p>
							{item?.known_for?.map((item, index) => (
								<p key={index}>{item.title || item.name}</p>
							))}
						</p>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default SearchCard;
