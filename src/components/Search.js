import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInAction2 } from "../slices/appSlices";
import NavBar from "./NavBar";
import Layout from "./Layout";

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
			{dataSearch?.map((item) => {
				console.log(item);
				return (
					<Layout key={item} item={item} />
					// <div key={item.id}>{item.titleText.text}</div>
				);
			})}
		</div>
	);
};

export default Search;
