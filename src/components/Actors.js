import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction5 } from "../slices/appSlices";
import Template from "./utilsView/Template";
import "swiper/css/bundle";
import Row from "./Row";

const Actors = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction5("/trending/person/day?language=en-US"));
	}, [dispatch]);

	const actorsData = useSelector((state) => state.app.actorData.data);
	// console.log(actorsData);
	return (
		<Template>
			<div>
				<p>
					<strong>Popular Actors</strong>
				</p>
			</div>
			<Row items={actorsData} type="actor" />
		</Template>
	);
};

export default Actors;
