import React from "react";
import NavBar from "./NavBar";
import Template from "./utilsView/Template";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { oneActorData, tvCreditsData1 } from "../slices/appSlices";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { movieCreditsData1 } from "../slices/appSlices";
import "swiper/swiper-bundle.css";
import Card from "./Card";
import styles from "../styles/Actor.module.scss";

const Actor = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		// console.log(id)
		dispatch(oneActorData(`/person/${id}?language=en-US`));
	}, [dispatch]);
	const actor = useSelector((state) => state.app.oneActorData.data);

	useEffect(() => {
		dispatch(tvCreditsData1(id));
	}, [dispatch, id]);

	const credits1 = useSelector((state) => state.app.tvCreditsData.data?.cast);
	// console.log(credits1);

	useEffect(() => {
		dispatch(movieCreditsData1(id));
	}, [dispatch, id]);

	const credits = useSelector((state) => state.app.movieCreditsData.cast);
	console.log(credits);

	const state = useSelector((state) => state.app);
	// console.log(state);

	useEffect(() => {
		const el = document.querySelector(`.${styles.movieCredits}`);
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
			const walk = (x - startX) * 2;
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
	// console.log(actor);

	return (
		<div>
			<NavBar />
			<Template>
				<div className={styles.actorContainer}>
					<div className={styles.imageContainer}>
						<img
							src={
								actor?.profile_path
									? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
									: "/images/image-not-found.png"
							}
							alt={actor?.name}
						/>
						<div className={styles.personalInfo}>
							<p>
								<strong>Personal Info</strong>
							</p>
						</div>
						<div className={styles.knownFor}>
							<p>
								<strong>Known for</strong>
							</p>
							<p>{actor?.known_for_department}</p>
						</div>
						<p>
							<strong>Birthday</strong>
						</p>
						<p>{actor?.birthday}</p>
						<p>{actor?.place_of_birth}</p>
						<div className={styles.knownAs}>
							<p>
								<strong>Also Known As</strong>
							</p>
							{actor?.also_known_as.map((name, index) => (
								<p key={index}>{name}</p>
							))}
						</div>
					</div>

					<div className={styles.actorDetails}>
						<p>
							<strong>{actor?.name}</strong>
						</p>
						<p>Popularity: {actor?.popularity}</p>
						<div className={styles.actorBiography}>
							<p>
								<strong>Biography:</strong>
							</p>
							{actor?.biography.split("\n\n").map((paragraph, index) => (
								<p key={index}>{paragraph}</p>
							))}
						</div>
						<div className={styles.actorCredits}>
							<h2>Movie Credits</h2>
							<div className={styles.movieCredits}>
								{[...(credits || []), ...(credits1 || [])]
									?.filter((credit) => credit.vote_count >= 100)
									.sort((a, b) => b.vote_average - a.vote_average)
									.map((credit) => (
										<Card key={credit.credit_id} item={credit} />
									))}
							</div>
						</div>
					</div>
				</div>
			</Template>
		</div>
	);
};

export default Actor;
