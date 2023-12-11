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
			state.movieData.data = action.payload;
		},
	},
});

export const { getAppData, getSearchData, getMovieData } = appSlice.actions;

export const logInAction = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getAppData(response.results));
};

export const logInAction2 = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getSearchData(response.results));
};

export const logInAction3 = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	dispatch(getMovieData(response.results));
};

export default appSlice.reducer;
