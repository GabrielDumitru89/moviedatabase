import React, { useEffect, useState } from "react";
import styles from "../styles/NavBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from "../slices/appSlices";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const NavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logInAction("/titles/utils/titleTypes"));
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
			<div onClick={() => {navigate("/")}}>Home</div>
			{dataNav?.map((item, index) => (
				<div key={index}>{item}</div>
			))}
			<div>
				<input
					type="input"
					value={input}
					onChange={handleChange}
					onKeyDown={handleKeyPress}
				/>
			</div>
			<button onClick={handleClick}>Search</button>
		</div>
	);
};

export default NavBar;
