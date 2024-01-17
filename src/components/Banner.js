import React, { useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Banner.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { bannerData, videosData } from "../slices/appSlices";
import { useNavigate } from "react-router-dom";
import VideoCarousel from "./VideoCarousel";

const Banner = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(bannerData("/movie/upcoming?language=en-US&page=1"));
	}, [dispatch]);

	const banner1Data = useSelector((state) => state.app.bannerData.data);
	const bannerVideos = useSelector((state) => state.app.videosData?.data);

	useEffect(() => {
		if (banner1Data) {
			// Fetch videos for each item in banner1Data
			banner1Data.forEach((item) => {
				dispatch(videosData(`/movie/${item.id}/videos?language=en-US`));
			});
		}
	}, [dispatch, banner1Data]);

	return (
		<div className={styles.Banner}>
			<div className={styles.bannerWrapper}>
				{banner1Data?.length > 0 ? (
					<Carousel
						autoPlay
						infiniteLoop
						showStatus={false}
						showIndicators={true}
						showThumbs={false}
						interval={5000}
					>
						{banner1Data.map((item) => (
							<div
								key={item.id}
								className={styles.carouselWrapper}
								onClick={() => {
									navigate(`/movie/${item.id}?language=en-US`);
								}}
							>
								{bannerVideos && bannerVideos.length > 0 ? (
									<VideoCarousel videoId={bannerVideos[0].key} />
								) : (
									<div className={styles.carouselImage}>
										<img
											src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
											alt={item.title}
										/>
									</div>
								)}
								<div className={styles.carouselTitle}>
									
									<h1>{item.title}</h1>
									<p>{item.overview}</p>
									{/* {banner1Data?.genres.map((genre, index) => (
										<p key={index}>{genre.name}</p>
									))} */}
								</div>
							</div>
						))}
					</Carousel>
				) : (
					<p>No data available</p>
				)}
			</div>
		</div>
	);
};

export default Banner;
