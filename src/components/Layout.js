import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction3 } from "../slices/appSlices";
import MovieCard from "./MovieCard";
import styles from "../styles/Layout.module.scss";
import Movie from "./Movie";

const Layout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction3("/titles"));
	}, [dispatch]);

	const layoutData = useSelector((state) => state.app.movieData.data);
	const dataSearch = useSelector((state) => state.app.searchedData.data);

	console.log(layoutData);

	return (
		<div className={styles.layout}>
			{layoutData?.map((item, index) => (
				<MovieCard key={index} item={item} />
			))}
			:
			{dataSearch?.map((item, index) => (
				<Movie key={index} item={item} />
			))}
		</div>
	);
};

export default Layout;
