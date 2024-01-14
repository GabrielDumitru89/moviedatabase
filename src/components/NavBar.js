import React, { useEffect, useState } from "react";
import styles from "../styles/NavBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { navData } from "../slices/appSlices";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(navData("/movie/top_rated?language=en-US"));
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
			<div className={styles.navItems}>
				<div className={styles.links}>
					{/* <div onClick={() => {navigate("/")}}>Home</div> */}
					<img
						onClick={() => {
							navigate("/");
						}}
						src="/images/tmdb.svg"
						alt="Home"
					/>
				</div>

				<div className={styles.search}>
					<div className={styles.input}>
						<label htmlFor="search"></label>
						<input
							type="input"
							id="search"
							name="search"
							value={input}
							placeholder="Search"
							onChange={handleChange}
							onKeyDown={handleKeyPress}
						/>
					</div>
					<div>
						<button onClick={handleClick}>Search</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
