import React, { useEffect, useState } from "react";
import styles from "../styles/MediaDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { videosData, imagesData } from "../slices/appSlices";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import Row from "./Row";

const MediaDetail = ({ item, mediaType }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const [details, setDetails] = useState(null);
	const [cast, setCast] = useState([]);

	useEffect(() => {
		dispatch(imagesData(`/${mediaType}/${item.id}/images`));
		// console.log(imagesData);
	}, [item]);

	const images = useSelector((state) => state.app.imageData);
	// console.log(images);

	useEffect(() => {
		dispatch(videosData(`/${mediaType}/${item.id}/videos?language=en-US`));
	}, [dispatch, item]);

	const videos = useSelector((state) => state.app?.videoData?.data);

	const openLightbox = () => {
		const trailer = videos?.find((video) => video.type === "Trailer");
		if (trailer) {
			const instance = basicLightbox.create(`
            <div>
                <iframe width="800" height="450" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `);

			instance.show();
		}
	};

	const [mediaDetails, setMediaDetails] = useState(null);

	useEffect(() => {
		const fetchMediaDetails = async () => {
			try {
				if (!mediaType || !id) {
					console.error("Invalid mediaType or id");
					return;
				}

				let endpoint = ""; // Declare endpoint here

				if (mediaType === "movie") {
					endpoint = `/movie/${id}`;
				} else if (mediaType === "tv") {
					endpoint = `/tv/${id}`;
				} else {
					console.error("Invalid mediaType");
					return;
				}

				const response = await fetch(
					`${process.env.REACT_APP_BASE_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				// console.log("Media Details:", data);
				setMediaDetails(data);
			} catch (error) {
				console.error("Error fetching media details:", error);
			}
		};

		fetchMediaDetails();
	}, [mediaType, id]);

	useEffect(() => {
		const fetchCredits = async () => {
			try {
				if (!mediaType || !item.id) {
					console.error("Invalid mediaType or item.id");
					return;
				}

				let creditsEndpoint;
				if (mediaType === "movie") {
					creditsEndpoint = `/movie/${item.id}/credits`;
				} else if (mediaType === "tv") {
					creditsEndpoint = `/tv/${item.id}/aggregate_credits`;
				}

				const response = await fetch(
					`${process.env.REACT_APP_BASE_URL}${creditsEndpoint}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
				);

				const data = await response.json();
				setCast(data.cast);
			} catch (error) {
				console.error("Error fetching credits:", error);
			}
		};

		fetchCredits();
	}, [item.id, mediaType]);

	const title = mediaType === "movie" ? item?.title : item?.original_name;
	const backdropPath = item?.backdrop_path;
	const posterPath = item?.poster_path;
	const releaseDate =
		mediaType === "movie" && item?.release_date
			? new Date(item.release_date).toLocaleDateString("en-US")
			: mediaType === "tv" && item?.first_air_date
			? new Date(item.first_air_date).toLocaleDateString("en-US")
			: null;

	const genres =
		mediaDetails &&
		(mediaDetails.genres?.length > 0 || mediaDetails.genre_ids?.length > 0)
			? (mediaDetails.genres || []).map((genre) => genre.name).join(", ")
			: "Genres not available";

	const runtime =
		mediaDetails &&
		((mediaType === "movie" &&
			mediaDetails.runtime &&
			typeof mediaDetails.runtime === "number") ||
			(mediaType === "tv" &&
				mediaDetails.episode_run_time &&
				mediaDetails.episode_run_time.length > 0 &&
				typeof mediaDetails.episode_run_time[0] === "number"))
			? mediaType === "movie"
				? `${mediaDetails.runtime} min`
				: mediaType === "tv"
				? `${mediaDetails.episode_run_time[0]} min per episode`
				: "Runtime not available"
			: null;

	// console.log("item:", item);
	// console.log("mediaType:", mediaType);

	useEffect(() => {
		const el = document.querySelector(`.${styles.mediaImages}`);
		let isDown = false;
		let startX;
		let scrollLeft;

		const mouseDownHandler = (e) => {
			isDown = true;
			startX = e.pageX - el.offsetLeft;
			scrollLeft = el.scrollLeft;
		};

		const mouseLeaveHandler = () => {
			isDown = false;
		};

		const mouseUpHandler = () => {
			isDown = false;
		};

		const mouseMoveHandler = (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - el.offsetLeft;
			const walk = (x - startX) * 3; //scroll-fast
			el.scrollLeft = scrollLeft - walk;
		};

		el.addEventListener("mousedown", mouseDownHandler);
		el.addEventListener("mouseleave", mouseLeaveHandler);
		el.addEventListener("mouseup", mouseUpHandler);
		el.addEventListener("mousemove", mouseMoveHandler);

		return () => {
			el.removeEventListener("mousedown", mouseDownHandler);
			el.removeEventListener("mouseleave", mouseLeaveHandler);
			el.removeEventListener("mouseup", mouseUpHandler);
			el.removeEventListener("mousemove", mouseMoveHandler);
		};
	}, []);

	const posterUrl = mediaDetails?.poster_path
		? `https://image.tmdb.org/t/p/w200/${mediaDetails.poster_path}`
		: "default_image_url";
	const backdropUrl = mediaDetails?.backdrop_path
		? `https://image.tmdb.org/t/p/w1280/${mediaDetails.backdrop_path}`
		: "default_image_url";

	return (
		<div className={styles.mediaDetailContainer}>
			<div className={styles.mediaHeader}>
				<div className={styles.mediaBackdrop}>
					<img
						src={backdropUrl}
						alt={mediaDetails?.title || mediaDetails?.original_name}
						className={styles.mediaImage}
					/>
				</div>
			</div>

			<div className={styles.mediaInfo}>
				<div>
					<img
						src={posterUrl}
						alt={mediaDetails?.title || mediaDetails?.original_name}
						className={styles.mediaPoster}
					/>
				</div>

				<div className={styles.mediaDetails}>
					<h1 className={styles.mediaTitle}>
						{mediaDetails?.title || mediaDetails?.original_name}
					</h1>
					<div className={styles.releaseAndGenres}>
						{mediaDetails?.genres.map((genre, index) => (
							<p key={index}>{genre.name}</p>
						))}
					</div>

					<button className={styles.trailerButton} onClick={openLightbox}>
						Watch Trailer
					</button>

					<p>{mediaDetails?.tagline}</p>
					<p>
						<strong>Overview:</strong> {mediaDetails?.overview}
					</p>

					{mediaType === "movie" && (
						<>
							<p>
								<strong>Release Date:</strong>{" "}
								{new Date(mediaDetails?.release_date).toLocaleDateString(
									"en-US"
								)}
							</p>
							<p>
								<strong>Runtime:</strong>{" "}
								{Math.floor(mediaDetails?.runtime / 60)}h{" "}
								{mediaDetails?.runtime % 60}m
							</p>
							<p>
								<strong>Budget:</strong>{" "}
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(mediaDetails?.budget)}
							</p>
							<p>
								<strong>Revenue:</strong>{" "}
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(mediaDetails?.revenue)}
							</p>
						</>
					)}

					{mediaType === "tv" && (
						<p>
							<strong>Episode Run Time:</strong>{" "}
							{mediaDetails?.episode_run_time[0]} minutes per episode
						</p>
					)}

					{/* Additional sections based on your needs */}
				</div>
			</div>

			<div className={styles.mediaImagesContainer}>
				<div>
					<p>
						<strong>Images</strong>
					</p>
				</div>
				<div className={styles.mediaImages}>
					{images?.backdrops?.map((image, index) => (
						<div
							key={index}
							onClick={() => {
								const instance = basicLightbox.create(`
            <img src="https://image.tmdb.org/t/p/w1280${image.file_path}" width="800" height="600">
          `);
								instance.show();
							}}
						>
							<img
								src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
								alt=""
							/>
						</div>
					))}
				</div>
			</div>

			<div className={styles.mediaCast}>
				<div>
					<h2>Cast</h2>
				</div>
				<Row items={cast} type="actor" />
			</div>

			{mediaType === "tv" && (
				<div className={styles.mediaSeasons}>
					<div>
						<p>
							<strong>Seasons</strong>
						</p>
					</div>
					<Row
						items={mediaDetails?.seasons}
						type="season"
						seriesId={mediaDetails?.id}
					/>
				</div>
			)}
		</div>
	);
};

export default MediaDetail;
