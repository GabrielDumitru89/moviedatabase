import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInAction2 } from "../slices/appSlices";
import NavBar from "./NavBar";
import Layout from "./Movies";
import MovieCard from "./MovieCard";
import Template from "./utilsView/Template";
const Search = () => {
	const { name } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (name) {
			dispatch(logInAction2(`/titles/search/keyword/${name}`));
		}
	}, [dispatch, name]);

	const dataSearch = useSelector((state) => state.app.searchedData.data);

	return (
		<div>
			<NavBar />
			<Template >
				{dataSearch?.map((item, index) => {
					return (
						<MovieCard key={index} item={item} />
					);
				})}
			</Template>
		</div>
	);
};

export default Search;
