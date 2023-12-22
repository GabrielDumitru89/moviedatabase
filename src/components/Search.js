import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../slices/appSlices";
import NavBar from "./NavBar";
import SearchCard from "./SearchCard";
import Template from "./utilsView/Template";
const Search = () => {
	const { name } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (name) {
			dispatch(searchData(`/titles/search/title/${name}`));
		}
	}, [dispatch, name]);

	const dataSearch = useSelector((state) => state.app.searchedData.data);

	return (
		<div>
			<NavBar />
			<Template >
				{dataSearch?.map((item, index) => {
					return <SearchCard key={index} item={item} />;
				})}
			</Template>
		</div>
	);
};

export default Search;
