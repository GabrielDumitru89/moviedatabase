import React, { useEffect, useState } from "react";
import styles from "../styles/SeriesDetail.module.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { videosData } from "../slices/appSlices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

const SeriesDetail = ({ item }) => {
	// console.log('Rendering SeriesDetail')

	const { id } = useParams();
	// console.log('item', item);

	const navigate = useNavigate();

	const [seriesDetails, setSeriesDetails] = useState(null);
	const [videos, setVideos] = useState([]);
	const [cast, setCast] = useState([]);

	useEffect(() => {
		// console.log('item prop changed1', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => setSeriesDetails(data));
	}, [id]);

	useEffect(() => {
		// console.log('item prop changed2', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => setVideos(data.results));
	}, [id]);

	useEffect(() => {
		// console.log('item prop changed3', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/tv/${item.id}/aggregate_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => setCast(data.cast));
	}, [item]);

	return (
		<div className={styles.seriesDetailContainer}>
			<div className={styles.seriesHeader}>
				<div className={styles.seriesBackdrop}>
					<img
						src={`https://image.tmdb.org/t/p/w500/${seriesDetails?.backdrop_path}`}
						alt={seriesDetails?.title}
						className={styles.seriesImage}
					/>
				</div>
			</div>
			<div className={styles.seriesInfo}>
				<img
					src={`https://image.tmdb.org/t/p/w200/${seriesDetails?.poster_path}`}
					alt={seriesDetails?.title}
					className={styles.seriesPoster}
				/>
				<div className={styles.seriesDetails}>
					<h1 className={styles.seriesTitle}>{seriesDetails?.original_name}</h1>
					<div className={styles.releaseAndGenres}>
						{seriesDetails?.genres.map((genre, index) => (
							<p key={index}>{genre.name}</p>
						))}
					</div>
					<p>{seriesDetails?.tagline}</p>
					<h3>Original Name: {seriesDetails?.original_name}</h3>
					<h3>Overview:</h3>
					<p>{seriesDetails?.overview}</p>
					<div className={styles.seriesCredits}>
						<h3>Created By:</h3>
						{seriesDetails?.created_by.map((creator, index) => (
							<div key={index}>
								<p>Name: {creator.name}</p>
								{/* <img
										// src={`https://image.tmdb.org/t/p/w200/${creator.profile_path}`}
										alt={creator.name}
									/> */}
							</div>
						))}
						<h3>
							Episode Run Time: {seriesDetails?.episode_run_time[0]} minutes
						</h3>
					</div>
				</div>
			</div>
			<div className={styles.videoContainer}>
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

			<div className={styles.seriesCast}>
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
					style={{ width: "100vw" }}
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
									{/* <div>
										{actor.roles.map((role, index) => (
											<div key={index}>
												<p>Character: {role.character}</p>
												<p>Episode Count: {role.episode_count}</p>
											</div>
										))}
									</div> */}
									<div>
										{actor.roles[0] && (
											<div>
												<p>Character: {actor.roles[0].character}</p>
												<p>Episode Count: {actor.roles[0].episode_count}</p>
											</div>
										)}
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
			<div className={styles.seasons}>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={0}
					slidesPerView={5}
					initialSlide={1}
					navigation
					pagination={{ clickable: true, dynamicBullets: true }}
					style={{ width: "100vw" }}
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
					{seriesDetails?.seasons.map((season, index) => (
						<SwiperSlide
							key={index}
							onClick={() =>
								navigate(
									`/series/${seriesDetails.id}/season/${season.season_number}`
								)
							}
							style={{ cursor: "pointer" }}
						>
							<div>
								<img
									src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`}
									alt={season.name}
								/>
								<h4>{season.name}</h4>
								<p>Episodes: {season.episode_count}</p>
								<p>Air Date: {season.air_date}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default SeriesDetail;
