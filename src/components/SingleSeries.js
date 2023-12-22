import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import Template from "./utilsView/Template";
import MovieDetail from "./MovieDetail";

const SingleSeries = () => {
  const { id } = useParams();
	const condition = null;
	const singleSeries = useSelector((state) => condition ? state.app.seriesData.data : state.app.topRatedS.data);
	// console.log(singleSeries);
	const dataSingleSeries = singleSeries.filter((item, index) => item.id === id);
	return (
		<div>
			{/* <NavBar /> */}
			<Template>
				{dataSingleSeries?.map((item, index) => (
					<MovieDetail key={index} item={item} />
				))}
			</Template>
		</div>
	);
};

export default SingleSeries