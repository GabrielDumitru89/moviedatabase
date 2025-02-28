import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ModalComponent from "./components/utilsView/Modal";
import Toast from "./components/utilsView/Toast";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById("root"));

// const container = document.getElementById("root");
// const root = ReactDOM.createRoot(container);
let persistor = persistStore(store);


root.render(
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate loading={null} persistor={persistor}>
				<App />
				<Toast />
				<ModalComponent />
			</PersistGate>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
