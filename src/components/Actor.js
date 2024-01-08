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

	const credits1 = useSelector((state) => state.app.tvCreditsData.data.cast);
	console.log(credits1);

	useEffect(() => {
		dispatch(movieCreditsData1(id));
	}, [dispatch, id]);

	const credits = useSelector((state) => state.app.movieCreditsData.cast);
	console.log(credits);

	const state = useSelector((state) => state.app);
	// console.log(state);

	// const [credits, setCredits] = useState([]);
	// useEffect(() => {
	// 	fetch(
	// 		`${process.env.REACT_APP_BASE_URL}/person/${id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const creditsWithTypes = data.cast.map(credit => ({ ...credit, type: credit.media_type }));
	// 			setCredits(creditsWithTypes);
	// 		});
	// }, [id]);

	useEffect(() => {
		const el = document.querySelector(`.${styles.movieCredits}`);
		const handleWheel = (e) => {
			if (e.deltaY > 0) el.scrollLeft += 100;
			else el.scrollLeft -= 100;
			e.preventDefault();
		};
		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			el.removeEventListener("wheel", handleWheel);
		};
	}, []);

	useEffect(() => {
		const el = document.querySelector(`.${styles.movieCredits}`);
		let isDown = false;
		let startX;
		let scrollLeft;
		const handleMouseDown = (e) => {
			isDown = true;
			startX = e.pageX - el.offsetLeft;
			scrollLeft = el.scrollLeft;
		};
		const handleMouseLeave = () => {
			isDown = false;
		};
		const handleMouseUp = () => {
			isDown = false;
		};
		const handleMouseMove = (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - el.offsetLeft;
			const walk = (x - startX) * 2;
			el.scrollLeft = scrollLeft - walk;
		};
		el.addEventListener("mousedown", handleMouseDown);
		el.addEventListener("mouseleave", handleMouseLeave);
		el.addEventListener("mouseup", handleMouseUp);
		el.addEventListener("mousemove", handleMouseMove);
		return () => {
			el.removeEventListener("mousedown", handleMouseDown);
			el.removeEventListener("mouseleave", handleMouseLeave);
			el.removeEventListener("mouseup", handleMouseUp);
			el.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	// console.log(actor)
	// console.log(useSelector(state => state))
	// console.log(useSelector(state => state.app.oneActorData))
	// console.log(useSelector(state => state.app))

	return (
		<div>
			<NavBar />
			<Template>
				<div className={styles.actorContainer}>
					<div>
						<div className={styles.imageContainer}>
							<img
								src={
									actor?.profile_path
										? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
										: ""
								}
								alt={actor?.name}
							/>
							<div>
								<p>
									<strong>Personal Info</strong>
								</p>
							</div>
							<div>
								<p>
									<strong>Known for</strong>
								</p>
								<p>{actor?.known_for_department}</p>
							</div>
							<div>
								<p>
									<strong>Birthday</strong>
								</p>
								<p>{actor?.birthday}</p>
							</div>
							<div>
								<p>{actor?.place_of_birth}</p>
							</div>
							<div>
								<p>
									<strong>Also Known As</strong>
								</p>
								{actor?.also_known_as.map((name, index) => (
									<p key={index}>{name}</p>
								))}
							</div>
						</div>
					</div>

					<div>
						<div>
							<h1>{actor?.name}</h1>
						</div>

						{/* <div>
						<p>Popularity: {actor?.popularity}</p>
					</div> */}
						<div>
							<div className={styles.actorBiography}>
								<p>
									<strong>Biography:</strong>
								</p>
								{actor?.biography.split("\n\n").map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))}
							</div>
							<div>
								<div className={styles.actorCredits}>
									<h2>Movie Credits</h2>
									{/* <div className={styles.movieCredits}>
										{credits?.map((credit) => (
											<Card key={credit.credit_id} item={credit} />
										))}
									</div> */}
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
					</div>
				</div>
			</Template>
		</div>
	);
};

export default Actor;
