import React from "react";
import NavBar from "./NavBar";
import ActorsCard from "./ActorsCard";
import Template from "./utilsView/Template";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { oneActorData } from "../slices/appSlices";
import { useEffect } from "react";

const Actor = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(oneActorData(`/actors/${id}`));
	}, [dispatch]);
	const actors = useSelector((state) => state.app.oneActorData.data);

	return (
		<div>
			<NavBar />
			<Template>
				
					<ActorsCard item={actors} />
				
			</Template>
		</div>
	);
};

export default Actor;
