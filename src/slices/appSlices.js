import { createSlice } from "@reduxjs/toolkit";
import { fetcher } from "../components/utilsFunctions/fetcher";

const initialState = {
	appData: {
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
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		getAppData: (state, action) => {
			// console.log(action.payload);
			state.appData.data = action.payload;
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
			state.actorData.data = action.payload;
		},
		getTopRatedM: (state, action) => {
			state.topRatedM.data = action.payload;
		},
		getTopRatedS: (state, action) => {
			state.topRatedS.data = action.payload;
		},
		getOneActorData: (state, action) => {
			state.oneActorData.data = action.payload;
		},
	},
});

export const {
	getAppData,
	getSearchData,
	getMovieData,
	getSeriesData,
	getActorData,
	getTopRatedM,
	getTopRatedS,
	getOneActorData,
} = appSlice.actions;

export const navData = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getAppData(response.results));
};

export const searchData = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getSearchData(response.results));
};

export const logInAction3 = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	// console.log(response);
	dispatch(getMovieData(response.results));
};
export const logInAction4 = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getSeriesData(response.results));
};
export const logInAction5 = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	// console.log(response);
	dispatch(getActorData(response.results));
};

export const topRatedMovies = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getTopRatedM(response.results));
};

export const topRatedSeries = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getTopRatedS(response.results));
};

export const oneActorData = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	console.log(response.results)
	dispatch(getOneActorData(response.results));
};

export default appSlice.reducer;
