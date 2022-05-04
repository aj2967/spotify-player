import { useState, useEffect } from "react";

import { BiSearch, BiLibrary } from "react-icons/bi";
import { FaPlay, FaSignOutAlt } from "react-icons/fa";

import "./sidebar.css";
import SidebarButton from "./SidebarButton";
import apiClient from "../../spotify";
import avatar from "../../assets/images/placeholderAvatar.jpg";

const Sidebar = () => {
	const [image, setImage] = useState(avatar);
	useEffect(() => {
		apiClient
			.get("me")
			.then((res) => setImage(res?.data?.images[0]?.url))
			.catch((error) => console.log(error.message));
	}, []);

	return (
		<div className="sidebar-container">
			<img
				src={image || avatar}
				className="profile-image hide-mobile"
				alt="Profile Image"
			/>

			<div className="sidebar-links">
				<SidebarButton
					title="Search"
					to="/search"
					icon={<BiSearch />}
				/>
				<SidebarButton title="Player" to="/player" icon={<FaPlay />} />
				<SidebarButton title="Library" to="/" icon={<BiLibrary />} />
			</div>
			<div className="hide-mobile">
				<SidebarButton
					title="Sign Out"
					to=""
					icon={<FaSignOutAlt />}
					signOut="signOut"
				/>
			</div>
		</div>
	);
};

export default Sidebar;