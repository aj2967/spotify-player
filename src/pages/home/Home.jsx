import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { setClientToken } from "../../spotify";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";
import Search from "../search/Search";
import Library from "../library/Library";
import Player from "../player/Player";
import "./home.css";

const Home = () => {
	const [token, setToken] = useState("");

	useEffect(() => {
		let temp = JSON.parse(localStorage.getItem("token"));
		const token = temp?.value
		const hash = window.location.hash;
		window.location.hash = "";

		if (!token && hash) {
			const urlToken = hash.split("&")[0].split("=")[1];
			setToken(urlToken);
			setClientToken(urlToken);
			setExpiry("token", urlToken, 3599999);
		} else {
			setToken(token);
			setClientToken(token);
		}

		getExpiry('token');
	}, [window.onload]);

	const setExpiry = (key, value, ttl) => {
		const now = new Date();
		const item = {
			value: value,
			expiry: now.getTime() + ttl,
		};
		localStorage.setItem(key, JSON.stringify(item));
	};

	const getExpiry = (key) => {
		const itemStr = localStorage.getItem(key);
		if (!itemStr) {
			return null;
		}
		const item = JSON.parse(itemStr);
		const now = new Date();

		if (now.getTime() > item.expiry) {
			localStorage.removeItem(key);
			setToken(null);
			setClientToken(null);
			return null;
		}
		return item.value;
	};

	return !token ? (
		<Login />
	) : (
		<div className="main-body screen-container">
			<Sidebar />
			<Routes>
				<Route exact path="/" element={<Library />} />
				<Route path="/spotify-player/" element={<Library />} />
				<Route path="/search" element={<Search />} />
				<Route path="/player" element={<Player />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default Home;
