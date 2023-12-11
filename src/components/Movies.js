import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction3 } from "../slices/appSlices";
import MovieCard from "./MovieCard";

import Movie from "./Movie";
import Template from "./utilsView/Template";
const Layout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction3("/titles"));
	}, [dispatch]);

	const layoutData = useSelector((state) => state.app.movieData.data);
	const dataSearch = useSelector((state) => state.app.searchedData.data);

	return (
		<Template >
			{layoutData?.map((item, index) => (
				<MovieCard key={index} item={item} />
			))}

		</Template>
	);
};

export default Layout;
