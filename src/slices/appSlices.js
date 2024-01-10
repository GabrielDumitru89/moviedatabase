import { createSlice } from "@reduxjs/toolkit";
import { fetcher } from "../components/utilsFunctions/fetcher";

const initialState = {
	appData: {
		data: null,
	},
	modal: {
		isOpen: false,
		video: null,
	},
	bannerData: {
		data: null,
	},
	searchedData: {
		data: null,
	},
	movieData: {
		data: null,
	},
	seriesData: {
		data: null,
	},
	actorData: {
		data: null,
	},
	oneActorData: {
		data: null,
	},
	topRatedM: {
		data: null,
	},
	topRatedS: {
		data: null,
	},
	videoData: {
		data: null,
	},
	seasonData: {
		data: null,
	},
	episodeData: {
		data: null,
	},
	tvCreditsData: {
		data: null,
	},
	movieCreditsData: {
		data: null,
	},
	imageData: {
		data: null,
	},
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		getAppData: (state, action) => {
			// console.log(action.payload);
			state.appData.data = action.payload;
		},
		getBannerData: (state, action) => {
			state.bannerData.data = action.payload;
		},
		getSearchData: (state, action) => {
			state.searchedData.data = action.payload;
		},
		getMovieData: (state, action) => {
			// console.log('getMovieData action:', action);
			state.movieData.data = action.payload;
		},
		getSeriesData: (state, action) => {
			state.seriesData.data = action.payload;
		},
		getActorData: (state, action) => {
			// console.log(action.payload);
			state.actorData.data = action.payload;
		},
		getTopRatedM: (state, action) => {
			state.topRatedM.data = action.payload;
		},
		getTopRatedS: (state, action) => {
			state.topRatedS.data = action.payload;
		},
		getOneActorData: (state, action) => {
			// console.log(action.payload);
			state.oneActorData.data = action.payload;
		},
		getVideoData: (state, action) => {
			// console.log(action.payload);
			state.videoData.data = action.payload;
		},
		getSeasonData: (state, action) => {
			state.seasonData.data = action.payload;
		},
		getEpisodeData: (state, action) => {
			state.episodeData = action.payload;
		},
		getTvCreditsData: (state, action) => {
			state.tvCreditsData.data = action.payload;
		},
		getMovieCreditsData: (state, action) => {
			state.movieCreditsData = action.payload;
		},
		openModal: (state, action) => {
			console.log(action);
			state.modal.isOpen = true;
			state.modal.video = action.payload;
		},
		closeModal: (state, action) => {
			state.modal.isOpen = false;
		},
		getImageData: (state, action) => {
			state.imageData = action.payload;
		},
	},
});

export const {
	getAppData,
	getBannerData,
	getSearchData,
	getMovieData,
	getSeriesData,
	getActorData,
	getTopRatedM,
	getTopRatedS,
	getOneActorData,
	getVideoData,
	getSeasonData,
	getEpisodeData,
	getTvCreditsData,
	getMovieCreditsData,
	openModal,
	closeModal,
	getImageData,
} = appSlice.actions;

export const navData = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		dispatch(getAppData(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const bannerData = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		dispatch(getBannerData(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const searchData = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		dispatch(getSearchData(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const logInAction3 = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		// console.log(response);
		dispatch(getMovieData(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};
export const logInAction4 = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		dispatch(getSeriesData(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};
export const logInAction5 = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		// console.log(response);
		dispatch(getActorData(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const topRatedMovies = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		dispatch(getTopRatedM(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const topRatedSeries = (payload) => async (dispatch) => {
	try {
		const response = await fetcher(payload);
		dispatch(getTopRatedS(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const videosData = (payload) => async (dispatch) => {
	try {
		// console.log("videosData action is being called");
		// console.log("payload:", payload);
		const response = await fetcher(payload);
		// console.log(response);
		dispatch(getVideoData(response.results));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const oneActorData = (payload) => async (dispatch) => {
	try {
		// console.log(payload)
		const response = await fetcher(payload);
		// console.log(response);
		dispatch(getOneActorData(response));
	} catch (error) {
		// console.error("Error fetching data:", error.message);
	}
};

export const oneSeasonData = (payload) => async (dispatch) => {
	try {
		const { seriesId, seasonNumber } = payload;
		// console.log(payload)
		const url = `/tv/${seriesId}/season/${seasonNumber}?language=en-US`;
		const response = await fetcher(url);
		// console.log(response);
		dispatch(getSeasonData(response));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const oneEpisodeData = (payload) => async (dispatch) => {
	try {
		// console.log(payload);
		const url = `/tv/${payload.seriesId}/season/${payload.seasonNumber}/episode/${payload.episodeNumber}?language=en-US`;
		const response = await fetcher(url);
		// console.log(response);
		dispatch(getEpisodeData(response));
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
};

export const tvCreditsData1 = (payload) => async (dispatch) => {
	try {
		// console.log(payload);
		const url = `/person/${payload}/tv_credits?language=en-US`;
		// console.log("Fetching from URL:", url);
		const response = await fetcher(url);
		// console.log("Response from fetcher:", response);
		dispatch(getTvCreditsData(response));
		// console.log("Dispatching action with response:", response);
	} catch (error) {
		// console.log("Caught an error:", error);
		console.error("Error fetching data:", error.message);
	}
};

export const movieCreditsData1 = (payload) => async (dispatch) => {
	try {
		// console.log(payload);
		const url = `/person/${payload}/movie_credits?language=en-US`;
		// console.log("Fetching from URL:", url);
		const response = await fetcher(url);
		// console.log("Response from fetcher:", response);
		dispatch(getMovieCreditsData(response));
		// console.log("Dispatching action with response:", response);
	} catch (error) {
		// console.log("Caught an error:", error);
		console.error("Error fetching data:", error.message);
	}
};

export const imagesData = (payload) => async (dispatch) => {
	try {
		// console.log(payload);
		const response = await fetcher(payload);
		// console.log("Response from fetcher:", response);
		dispatch(getImageData(response));
		// console.log("Dispatching action with response:", response);
	} catch (error) {
		// console.log("Caught an error:", error);
		console.error("Error fetching data:", error.message);
	}
};

export default appSlice.reducer;
