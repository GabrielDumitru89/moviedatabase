import React from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Movie from "./components/Movie";
import Actor from "./components/Actor";
import Movies from "./components/Movies";
import SingleSeries from "./components/SingleSeries";
import SeasonDetail from "./components/SeasonDetail";
import EpisodeDetail from "./components/EpisodeDetail";
import Videos from "./components/Videos"

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/titles" element={<Movies />} />
			<Route path="/movie/:id" element={<Movie />} />
			<Route path="/:type/:id/videos" element={<Videos />} />
			<Route path="/tv/:id" element={<SingleSeries />} />
			<Route
				path="/series/:seriesId/season/:seasonNumber"
				element={<SeasonDetail />}
			/>
			<Route
				path="/tv/:seriesId/season/:seasonNumber/episode/:episodeNumber"
				element={<EpisodeDetail />}
			/>

			<Route path="/search/:name" element={<Search />} />
			<Route path="/person/:id" element={<Actor />} />
		</Routes>
	);
}

export default App;
