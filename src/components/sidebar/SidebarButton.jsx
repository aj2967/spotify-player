import { IconContext } from "react-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./sidebarButton.css";

const SidebarButton = ({ title, to, icon, signOut }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const isActive = location.pathname === to;
	const btnClass = isActive ? "btn-body active" : "btn-body";

	const handleSignOut = () => {
		if (signOut) {
			console.log("signed out");
			localStorage.removeItem('token');
			window.location.reload(false);
		}
	};

	return (
		<Link to={to}>
			<div className={btnClass} onClick={() => handleSignOut()}>
				<IconContext.Provider value={{ className: "btn-icon" }}>
					{icon}
					<p className="btn-title">{title}</p>
				</IconContext.Provider>
			</div>
		</Link>
	);
};

export default SidebarButton;