import React, { useEffect, useState } from "react";
import styles from "../styles/SeriesDetail.module.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { videosData } from "../slices/appSlices";
import { imagesData } from "../slices/appSlices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Row from "./Row";

const SeriesDetail = ({ item }) => {
	// console.log('Rendering SeriesDetail')

	const { id } = useParams();
	// console.log('item', item);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [seriesDetails, setSeriesDetails] = useState(null);
	// const [videos, setVideos] = useState([]);
	const [cast, setCast] = useState([]);

	useEffect(() => {
		dispatch(imagesData(`/tv/${item.id}/images`));
	}, [item]);
	const images = useSelector((state) => state.app.imageData);
	// console.log(images);
	// console.log(useSelector((state) => state.app.imageData));

	useEffect(() => {
		dispatch(videosData(`/tv/${item.id}/videos?language=en-US`));
	}, [dispatch, item]);
	const videos = useSelector((state) => state.app?.videoData?.data);
	// console.log(videos);

	useEffect(() => {
		// console.log('item prop changed1', item);
		fetch(
			`${process.env.REACT_APP_BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => setSeriesDetails(data));
	}, [id]);

	// useEffect(() => {
	// 	// console.log('item prop changed2', item);
	// 	fetch(
	// 		`${process.env.REACT_APP_BASE_URL}/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => setVideos(data.results));
	// }, [id]);

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
					<p>{seriesDetails?.overview}</p>
					<div className={styles.seriesCredits}>
						<p>
							<strong>Created By:</strong>
						</p>
						<div>
							{seriesDetails?.created_by.map((creator, index) => (
								<div key={index}>
									<p>{creator.name}</p>
								</div>
							))}
						</div>
					</div>
					<div>
						<p>
							<strong>Episode Run Time: </strong>
							{seriesDetails?.episode_run_time[0]} minutes
						</p>
					</div>
				</div>
			</div>
			<div className={styles.videoContainer}>
				<div className={styles.videos}>
					<div
						onClick={() => navigate(`/tv/${item?.id}/videos?language=en-US`)}
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
				<div>
					<p>
						<strong>Images</strong>
					</p>
				</div>
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

			<div className={styles.seriesCast}>
				<div>
					<p>
						<strong>Cast</strong>
					</p>
				</div>
				<Row items={cast} type="actor" />
			</div>

			<div className={styles.seasons}>
				<div>
					<p>
						<strong>Seasons</strong>
					</p>
				</div>
				<Row
					items={seriesDetails?.seasons}
					type="season"
					seriesId={seriesDetails?.id}
				/>
			</div>
		</div>
	);
};

export default SeriesDetail;
