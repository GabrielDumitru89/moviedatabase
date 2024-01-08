import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import Template from "./utilsView/Template";
import SeriesDetail from "./SeriesDetail";

const SingleSeries = () => {
	const { id } = useParams();

	// const condition = null;

	// 	const series = useSelector((state) => Array.isArray(state.app.seriesData.data) ? state.app.seriesData.data : []);
	// const topRatedS = useSelector((state) => Array.isArray(state.app.topRatedS.data) ? state.app.topRatedS.data : []);

	// const dataSingleSeries = singleSeries.filter(
	// 	(item, index) => Number(item.id) === Number(id)
	// );

	// const singleSeries = condition ? series : topRatedS;

	const series = useSelector((state) => state.app.seriesData.data);
	const searchData = useSelector((state) => state.app.searchedData.data);
	const topRatedS = useSelector((state) => state.app.topRatedS.data);
	const bannerData = useSelector((state) => state.app.bannerData.data);
	const tvCreditsData = useSelector((state) => state.app.tvCreditsData.data.cast);

	const singleSeries = [
		...(Array.isArray(series) ? series : []),
		...(Array.isArray(searchData) ? searchData : []),
		...(Array.isArray(topRatedS) ? topRatedS : []),
		...(Array.isArray(bannerData) ? bannerData : []),
		...(Array.isArray(tvCreditsData) ? tvCreditsData : []),
	];
	// console.log(tvCreditsData);

	const dataSingleSeries = singleSeries.find((item, index) => {
		// console.log('URL param id:', id);
		// console.log('Series id:', item.id);
		return Number(item.id) === Number(id);
	});

	return (
		<div>
			<NavBar />
			<Template>
				{dataSingleSeries && 
					<SeriesDetail item={dataSingleSeries} />
				}
			</Template>
		</div>
	);
};

export default SingleSeries;
