import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";

const Movie = (item) => {
	const { id } = useParams();

	const dataSingleMovie = item?.item?.filter((item, index) => item.id === id);
	console.log(item)
	const FilterCard = dataSingleMovie.map((item, index) => (
		<MovieCard key={index} item={item} />
	));
	return (
		<div>
			<NavBar />
			<FilterCard />
		</div>
	);
};

export default Movie;

// {
//   "results": {
//     "_id": "61e58553ef99b1c5434243d5",
//     "id": "tt0468569",
//     "primaryImage": {
//       "id": "rm4023877632",
//       "width": 1383,
//       "height": 2048,
//       "url": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
//       "caption": {
//         "plainText": "Morgan Freeman, Gary Oldman, Christian Bale, Michael Caine, Aaron Eckhart, Heath Ledger, Maggie Gyllenhaal, Cillian Murphy, and Chin Han in The Dark Knight (2008)",
//         "__typename": "Markdown"
//       },
//       "__typename": "Image"
//     },
//     "titleType": {
//       "text": "Movie",
//       "id": "movie",
//       "isSeries": false,
//       "isEpisode": false,
//       "__typename": "TitleType"
//     },
//     "titleText": {
//       "text": "The Dark Knight",
//       "__typename": "TitleText"
//     },
//     "originalTitleText": {
//       "text": "The Dark Knight",
//       "__typename": "TitleText"
//     },
//     "releaseYear": {
//       "year": 2008,
//       "endYear": null,
//       "__typename": "YearRange"
//     },
//     "releaseDate": {
//       "day": 24,
//       "month": 7,
//       "year": 2008,
//       "__typename": "ReleaseDate"
//     }
//   }
// }
