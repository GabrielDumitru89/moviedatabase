import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { videosData } from "../slices/appSlices";
import styles from "../styles/Videos.module.scss";
import NavBar from "./NavBar";

const Videos = ({ item }) => {
	const dispatch = useDispatch();
  const { type, id } = useParams();

	useEffect(() => {
		if (item) {
			dispatch(videosData(`/movie/${item.id}/videos?language=en-US`));
		}
	}, [dispatch, item]);

	const videos = useSelector((state) => state.app?.videoData?.data);
	console.log(videos);

	return (
		<div>
			<NavBar />
			<div className={styles.videoContainer}>
				{videos.map((video) => (
					<div key={video.id} className={styles.videoWrapper}>
						<p>
							<strong>{video.type}</strong>
						</p>
						{video.site === "YouTube" && (
							<iframe
								width="560"
								height="315"
								src={`https://www.youtube.com/embed/${video.key}`}
								title={video.name}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Videos;
