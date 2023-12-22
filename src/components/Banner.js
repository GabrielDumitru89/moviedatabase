import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Banner.module.scss";

const Banner = () => {
	return (
		<div className={styles.Banner}>
			<div>
				<Carousel
					autoPlay
					infiniteLoop
					showStatus={false}
					showIndicators={true}
					showThumbs={false}
					interval={5000}
				>
					<div>
						<img loading="lazy" src="/images/john-wick-3-parabellum_16.png" alt="banner1" />
					</div>
					<div>
						<img loading="lazy" src="/images/shazam-banner2.png" alt="banner2" />
					</div>
					<div>
						<img loading="lazy" src="/images/the-flash-banner.png" alt="banner3" />
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default Banner;
