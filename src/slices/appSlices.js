import { createSlice } from "@reduxjs/toolkit";
import { fetcher } from "../components/utilsFunctions/fetcher";

const initialState = {
	appData: {
		data: null,
	},
	searchedData: {
		data: null,
	},
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		getAppData: (state, action) => {
			console.log(action.payload);
			state.appData.data = action.payload;
		},
		getSearchData: (state, action) => {
			state.searchedData.data = action.payload;
		},
	},
});

export const { getAppData, getSearchData } = appSlice.actions;

export const logInAction = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	await dispatch(getAppData(response.results));
};

export const logInAction2 = (payload) => async (dispatch) => {
	const response = await fetcher(payload);
	await dispatch(getSearchData(response.results));
};

export default appSlice.reducer;
