import React, { useEffect, useState } from "react";
import styles from "../styles/NavBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { navData } from "../slices/appSlices";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(navData("/titles/utils/lists"));
	}, [dispatch]);

	const dataNav = useSelector((state) => state.app.appData.data);

	const [input, setInput] = useState("");

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			navigate(`/search/${input}`);
		}
	};

	const handleClick = () => {
		navigate(`/search/${input}`);
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.links}>
				{/* <div onClick={() => {navigate("/")}}>Home</div> */}
				<img
					onClick={() => {
						navigate("/");
					}}
					src="/images/tmdb.svg"
					alt="Home"
				/>
				{/* {dataNav?.map((item, index) => (
				<div
					onClick={() => {
						navigate(`/lists/${item}`);
					}}
					key={index}
				>
					{item}
				</div>
			))} */}
				<div
					onClick={() => {
						navigate(`/titles?list=most_pop_series&info=custom_info`);
					}}
				>
					Movies
				</div>
				<div
					onClick={() => {
						navigate(`/titles?list=most_pop_series&info=custom_info`);
					}}
				>
					Series
				</div>
			</div>

			<div className={styles.search}>
				<div>
					<input
						type="input"
						name="search"
						value={input}
						onChange={handleChange}
						onKeyDown={handleKeyPress}
					/>
				</div>
				<div>
					<button onClick={handleClick}>Search</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
