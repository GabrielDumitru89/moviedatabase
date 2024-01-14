// MediaDetailContainer.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Template from "./utilsView/Template";
import MediaDetail from "./MediaDetail";
import { videosData, imagesData, tvCreditsData1 } from "../slices/appSlices";

const MediaDetailContainer = () => {
	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();

	// Function to parse the query string and extract the 'type' parameter
	const getQueryParam = (name) => {
		const params = new URLSearchParams(location.search);
		return params.get(name);
	};

	useEffect(() => {
    // Extract 'type' from the query string
    const type = getQueryParam("type");
  
    // Check if 'type' is defined before dispatching actions
    if (type) {
      dispatch(imagesData(`/${type}/${id}/images`));
      dispatch(videosData(`/${type}/${id}/videos?language=en-US`));
  
      if (type === "movie") {
        dispatch(
          tvCreditsData1(
            `/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
          )
        );
      } else if (type === "tv") {
        dispatch(
          tvCreditsData1(
            `/${type}/${id}/aggregate_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
          )
        );
      }
    }
  }, [dispatch, id, location.search]);
	const images = useSelector((state) => state.app.imageData);
	const videos = useSelector((state) => state.app?.videoData?.data);
	const cast = useSelector((state) => state.app.tvCreditsData?.data?.cast);

	const dataSingleMedia = useSelector((state) => {
		const data = state.app[type === "movie" ? "movieData" : "seriesData"].data;
		return Array.isArray(data)
			? data.find((item) => Number(item.id) === Number(id))
			: null;
	});

	const renderMediaDetail = () => {
		if (images && videos && cast) {
			return (
				<MediaDetail
					item={dataSingleMedia}
					mediaType={type}
					images={images}
					videos={videos}
					cast={cast}
				/>
			);
		}
	}

	return (
		<div>
			<NavBar />
			<Template>
				{renderMediaDetail()}
				{dataSingleMedia && (
					<MediaDetail item={dataSingleMedia} mediaType={type} />
				)}
			</Template>
		</div>
	);
};

export default MediaDetailContainer;
