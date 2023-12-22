import React from "react";
import styles from "../styles/MovieDetail.module.scss";
import { useNavigate } from "react-router-dom";

const MovieDetail = ({ item }) => {
	const navigate = useNavigate();
	// console.log(item);
	// item.principalCast[0].credits.forEach((credit) => {
	// 	console.log(credit.name.nameText.text);
	// });
	// item.principalCast[0].credits.forEach((credit) => {
	// 	console.log(credit);
	// });

	return (
		<div className={styles.detail}>
			<div className={styles.image}>
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
			<div className={styles.text}>
				<div>
					<h1>{item?.titleText.text}</h1>
				</div>

				<div>
					<p>{item?.plot.plotText.plainText}</p>
				</div>

				<div>
					<p>
						Release Date:{" "}
						{item?.releaseDate
							? `${item?.releaseDate.day}/${item?.releaseDate.month}/${item?.releaseDate.year}`
							: "Release date not available"}
					</p>
				</div>

				<div>
					<p>Rating: {item?.ratingsSummary.aggregateRating}</p>
				</div>

				<div>
					<p>
						Genres: {item?.genres.genres.map((genre) => genre.text).join(", ")}
					</p>
				</div>

				<div>
					<p>
						Directors:{" "}
						{item?.directors
							?.map((director) => director.credits[0].name.nameText.text)
							.join(", ")}
					</p>
				</div>
				<div>
					<div>
						<p>Cast:</p>
					</div>
					<div className={styles.cast}>
						{item?.principalCast[0]?.credits?.map((credit, index) => (
							<div key={index} className={styles.actors}>
								<p
									onClick={() => {
										navigate(`/actors/${credit.name.id}`);
									}}
								>
									{credit.name.nameText.text}
								</p>
								{credit.name.primaryImage && (
									<img
										src={credit.name.primaryImage.url}
										alt={credit.name.nameText.text}
										onClick={() => {
											navigate(`/actors/${credit.name.id}`);
										}}
									/>
								)}
							</div>
						))}
					</div>
				</div>
				<div className={styles.trailer}>
					<iframe
						width="560"
						height="315"
						src={item?.trailer}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;
