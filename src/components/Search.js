import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInAction2 } from "../slices/appSlices";

const Search = () => {
	const { name } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction2(`/titles/search/keyword/${name}`));
	}, []);

	const dataRedux = useSelector((state) => state.app.searchedData.data);

	return (
		<div>
			{dataRedux?.map((item) => {
				return <div key={item.id}>{item.titleText.text}</div>;
			})}
		</div>
	);
};

export default Search;
