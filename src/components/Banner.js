import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Banner.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { bannerData } from "../slices/appSlices";
import { useNavigate } from "react-router-dom";

const Banner = ({ item }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(bannerData("/movie/upcoming?language=en-US&page=1"));
	}, [dispatch]);

	const banner1Data = useSelector((state) => state.app.bannerData.data);
	// console.log(banner1Data);

	return (
		<div className={styles.Banner}>
			<div className={styles.bannerWrapper}>
				<Carousel
					autoPlay
					infiniteLoop
					showStatus={false}
					showIndicators={true}
					showThumbs={false}
					interval={5000}
				>
					{banner1Data
						?.filter((item) => item.backdrop_path)
						.map((item) => (
							<div
								key={item.id}
								className={styles.carouselWrapper}
								onClick={() => {
									navigate(`/movie/${item.id}?language=en-US`);
								}}
							>
								<div className={styles.carouselImage}>
									<img
										src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
										alt={item.title}
									/>
								</div>
								<div className={styles.carouselTitle}>
									<h1>{item.title}</h1>
									<p>{item.overview}</p>
								</div>
							</div>
						))}
				</Carousel>
			</div>
		</div>
	);
};

export default Banner;
