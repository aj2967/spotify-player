import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { setClientToken } from "../../spotify";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";
import Search from "../search/Search";
import Library from "../library/Library";
import Player from "../player/Player";
import "./home.css";

const Home = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState("");

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		const hash = window.location.hash;
		window.location.hash = "";

		if (!token && hash) {
			const _token = hash.split("&")[0].split("=")[1];
			window.localStorage.setItem("token", _token);
			setToken(_token);
			setClientToken(_token);
			handleTimer();
		} else {
			setToken(token);
			setClientToken(token);
		}

		// if (token && tokenExpired === true) {
		// 	localStorage.removeItem("token");
		// 	setToken(null);
		// 	navigate("/login");
		// 	setTokenExpired(false);
		// }
	}, [window.onload]);

	const handleTimer = () => {
		console.log(`i'm running`);
		setTimeout(() => {
			// setTokenExpired(true);
			localStorage.removeItem("token");
			setToken(null);
			navigate("/login");
		}, 3599999);
	};

	return !token ? (
		<Login />
	) : (
		<div className="main-body screen-container">
			<Sidebar />
			<Routes>
				<Route exact path="/" element={<Library />} />
				<Route path="/search" element={<Search />} />
				<Route path="/player" element={<Player />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default Home;
