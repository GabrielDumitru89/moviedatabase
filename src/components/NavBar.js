import React, { useEffect, useState } from "react";
import styles from "../styles/NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logInAction} from "../slices/appSlices";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
			dispatch(logInAction("/titles/utils/titleTypes"));
	}, []);
	const dataRedux = useSelector((state) => state.app.appData.data);
	
	const [input, setInput] = useState("");

	const handleKeyPress = async (e) => {
		if (e.key === "Enter") {
			navigate(`search/${input}`);
		}
	};
	const handleClick = async () => {
		navigate(`search/${input}`);
	};

	return (
		<div className={styles.navbar}>
			{dataRedux?.map((item, index) => (
				<div key={index}>{item}</div>
			))}
			<div>
				<input
					type="input"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
			</div>
			<button onClick={handleClick}>Search</button>
		</div>
	);
};

export default NavBar;
