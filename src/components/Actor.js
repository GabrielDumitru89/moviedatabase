import React from "react";
import NavBar from "./NavBar";
import Template from "./utilsView/Template";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	oneActorData,
	tvCreditsData1,
	movieCreditsData1,
	actorImagesData,
} from "../slices/appSlices";
import { useEffect } from "react";
import Card from "./Card";
import styles from "../styles/Actor.module.scss";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import MouseDrag from "./utilsFunctions/MouseDrag";

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

	const tvCredits = useSelector((state) => state.app.tvCreditsData.data?.cast);
	// console.log(tvCredits);

	useEffect(() => {
		dispatch(movieCreditsData1(id));
	}, [dispatch, id]);

	const credits = useSelector((state) => state.app.movieCreditsData.cast);
	// console.log(credits);

	useEffect(() => {
		dispatch(actorImagesData(`/person/${id}/images?language=en-US`));
	}, [dispatch, id]);

	const actorImages = useSelector(
		(state) => state.app.actorImage?.data?.profiles
	);
	// console.log(actorImages);
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
						<div className={styles.actorImagesContainer}>
							<div>
								<p>
									<strong>Images</strong>
								</p>
							</div>
							<div className={styles.actorImages}>
								<MouseDrag elementClass={styles.actorImages} />
								{actorImages &&
									actorImages.map((image, index) => (
										<div
											key={index}
											onClick={() => {
												const instance = basicLightbox.create(`
													<img src="https://image.tmdb.org/t/p/original${image.file_path}" width="800" height="600">
													`);
												instance.show();
											}}
										>
											<img
												src={`https://image.tmdb.org/t/p/original${image.file_path.trim()}`}
												alt=""
											/>
										</div>
									))}
							</div>
						</div>
						<div className={styles.actorCredits}>
							<h2>Movie Credits</h2>
							<div className={styles.movieCredits}>
								<MouseDrag elementClass={styles.movieCredits} />
								{[...(credits || []), ...(tvCredits || [])]
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
