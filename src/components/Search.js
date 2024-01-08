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
			dispatch(
				searchData(`/search/multi?query=${name}&include_adult=false&language=en-US&page=1}`));
		}
	}, [dispatch, name]);

	const dataSearch = useSelector((state) => state.app.searchedData.data);
	// console.log(dataSearch);

	return (
		<div>
			<NavBar />
			<Template>
				{dataSearch?.map((item, index) => {
					return <SearchCard key={index} item={item} />;
				})}
			</Template>
		</div>
	);
};

export default Search;
