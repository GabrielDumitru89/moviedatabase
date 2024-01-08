import React, { useEffect, useState } from "react";
import styles from "../styles/MovieDetail.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { videosData } from "../slices/appSlices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

const MovieDetail =({ item }) => {
	// console.log('Rendering MovieDetail')
	// console.log('item prop:', item);

	const navigate = useNavigate();
	const dispatch = useDispatch();

		// useEffect(() => {
	// 	dispatch(videosData(`/movie/${item.id}/videos?language=en-US`));
	// }, [dispatch, item]);
	// const video = useSelector((state) => state.app?.videosData?.data);
	// console.log(video);
	// console.log(useSelector((state) => state));
	// console.log(useSelector((state) => state.app.videosData));
	// // console.log(useSelector((state) => state.app));
	
	const [movieDetails, setMovieDetails] = useState(null);
	const [director, setDirector] = useState(null);
	const [screenplayWriters, setScreenplayWriters] = useState([]);
	const [novelWriters, setNovelWriters] = useState([]);
	const [videos, setVideos] = useState([]);
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
		// console.log('item prop changed2', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/movie/${item.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => setVideos(data.results));
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
					{/* <button
						className={styles.trailerButton}
						onClick={() => {
							const trailer = videos.find((video) => video.type === "Trailer");
							if (trailer) {
								setVideos([trailer]);
							}
						}}
					>
						Watch Trailer
					</button> */}
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
				{/* <h3>Videos</h3> */}
				<div className={styles.videos}>
					{videos
						.filter((video) => video.type === "Trailer")
						.map((video) => (
							<div key={video.id} className={styles.videoWrapper}>
								<p>{video.type}</p>
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

			<div className={styles.movieCast}>
				<div>
					<h2>Cast</h2>
				</div>

				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={0}
					slidesPerView={5}
					initialSlide={1}
					navigation
					pagination={{ clickable: true, dynamicBullets: true }}
					// style={{ width: "100vw" }}
					breakpoints={{
						320: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 3,
						},
						1024: {
							slidesPerView: 5,
						},
					}}
				>
					{cast
						.slice(0, 20)
						.filter((actor) => actor.profile_path)
						.map((actor) => (
							<SwiperSlide
								key={actor.id}
								onClick={() => navigate(actor.id)}
								style={{ cursor: "pointer" }}
							>
								<div
									className={styles.castImage}
									onClick={() => navigate(`/person/${actor.id}`)}
								>
									<div>
										<img
											src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
											alt={actor.name}
										/>
									</div>
									<div>
										<p>
											<strong>{actor.name}</strong>
										</p>
									</div>
									<div>
										<p>{actor.character}</p>
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};

export default MovieDetail;
