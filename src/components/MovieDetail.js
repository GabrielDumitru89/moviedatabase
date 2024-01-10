import React, { useEffect, useState } from "react";
import styles from "../styles/MovieDetail.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { videosData } from "../slices/appSlices";
import { imagesData } from "../slices/appSlices";
import { openModal } from "../slices/appSlices";
import { closeModal } from "../slices/appSlices";
import ModalComponent from "./utilsView/Modal";
import Row from "./Row";

const MovieDetail = ({ item }) => {
	function handlerOpenModal(trailer) {
		dispatch(openModal(trailer));
	}
	const modalVideo = useSelector((state) => state.modalVideo);
	const modalIsOpen = useSelector((state) => state.modalIsOpen);

	const handleCloseModal = () => {
		dispatch(closeModal());
	};

	// console.log('Rendering MovieDetail')
	// console.log('item prop:', item);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(videosData(`/movie/${item.id}/videos?language=en-US`));
	}, [dispatch, item]);
	const videos = useSelector((state) => state.app?.videoData?.data);
	// console.log(videos);

	useEffect(() => {
		dispatch(imagesData(`/movie/${item.id}/images`));
	}, [item]);
	const images = useSelector((state) => state.app.imageData);
	// console.log(images);
	// console.log(useSelector((state) => state.app.imageData));

	const [movieDetails, setMovieDetails] = useState(null);
	const [director, setDirector] = useState(null);
	const [screenplayWriters, setScreenplayWriters] = useState([]);
	const [novelWriters, setNovelWriters] = useState([]);
	const [cast, setCast] = useState([]);

	useEffect(() => {
		// console.log('item prop changed', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/movie/${item.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				setMovieDetails(data);
			});
	}, [item]);

	useEffect(() => {
		// console.log('item prop changed1', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/movie/${item.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => {
				setDirector(data.crew.find((member) => member.job === "Director"));
				setScreenplayWriters(
					data.crew.filter((member) => member.job === "Screenplay")
				);
				setNovelWriters(data.crew.filter((member) => member.job === "Novel"));
			});
	}, [item]);

	useEffect(() => {
		// console.log('item prop changed3', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/movie/${item.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => setCast(data.cast));
	}, [item]);

	return (
		<div className={styles.movieDetailContainer}>
			<div className={styles.movieHeader}>
				<div className={styles.movieBackdrop}>
					<img
						src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
						alt={item?.title}
						className={styles.movieImage}
					/>
				</div>
			</div>

			<div className={styles.movieInfo}>
				<div>
					<img
						src={`https://image.tmdb.org/t/p/w200/${item?.poster_path}`}
						alt={item?.title}
						className={styles.moviePoster}
					/>
				</div>

				<div className={styles.movieDetails}>
					<h1 className={styles.movieTitle}>{item?.title}</h1>
					<div className={styles.releaseAndGenres}>
						<p>{new Date(item?.release_date).toLocaleDateString("en-US")}</p>
						<p>{movieDetails?.genres.map((genre) => genre.name).join(", ")}</p>
						<p>
							{Math.floor(movieDetails?.runtime / 60)}h{" "}
							{movieDetails?.runtime % 60}m
						</p>
					</div>
					<button
						className={styles.trailerButton}
						onClick={() => {
							const trailer = videos.find((video) => video.type === "Trailer");
							if (trailer) {
								handlerOpenModal(trailer);
							}
						}}
					>
						Watch Trailer
					</button>
					<ModalComponent
						video={modalVideo}
						isOpen={modalIsOpen}
						closeModal={closeModal}
					/>
					<p>{movieDetails?.tagline}</p>
					<p>
						<strong>Overview:</strong> {item?.overview}
					</p>
					<p>
						<strong>Budget:</strong>{" "}
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(movieDetails?.budget)}
					</p>
					<p>
						<strong>Revenue:</strong>{" "}
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(movieDetails?.revenue)}
					</p>
					<div className={styles.movieCredits}>
						<div>
							<h3>Director</h3>
							{director && <p>{director.name}</p>}
						</div>

						<div>
							<h3>Screenplay</h3>
							{screenplayWriters &&
								screenplayWriters.map((writer) => (
									<p key={writer.id}>{writer.name}</p>
								))}
						</div>

						<div>
							<h3>Novel</h3>
							{novelWriters &&
								novelWriters.map((writer) => (
									<p key={writer.id}>{writer.name}</p>
								))}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.videoContainer}>
				<div className={styles.videos}>
					<div
						onClick={() => navigate(`/movie/${item?.id}/videos?language=en-US`)}
						className={styles.videoLink}
					>
						<p>
							<strong>Videos</strong>
						</p>
					</div>
					{videos.find((video) => video.type === "Trailer") && (
						<div
							key={videos.find((video) => video.type === "Trailer").id}
							className={styles.videoWrapper}
						>
							{videos.find((video) => video.type === "Trailer").site ===
								"YouTube" && (
								<iframe
									width="560"
									height="315"
									src={`https://www.youtube.com/embed/${
										videos.find((video) => video.type === "Trailer").key
									}`}
									title={videos.find((video) => video.type === "Trailer").name}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							)}
						</div>
					)}
				</div>
			</div>
			<div className={styles.movieImagesContainer}>
				<div><p><strong>Images</strong></p></div>
				<div className={styles.movieImages}>
					{images?.backdrops?.map((image, index) => (
						<img
							key={index}
							src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
							alt=""
						/>
					))}
				</div>
			</div>
			<div className={styles.movieCast}>
				<div>
					<h2>Cast</h2>
				</div>
				<Row items={cast} type="actor" />
			</div>
		</div>
	);
};

export default MovieDetail;
