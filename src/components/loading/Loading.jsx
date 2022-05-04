import { AiOutlineLoading } from "react-icons/ai";
import { IconContext } from "react-icons";

import "./loading.css";

const Loading = () => {
	return (
		<div className="loading">
			<IconContext.Provider
				value={{
					size: "40px",
					color: "#C3B1E1",
					className: "loading-icon",
				}}
			>
				<AiOutlineLoading />
			</IconContext.Provider>
		</div>
	);
};

export default Loading;
