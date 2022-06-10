import { message } from "antd";
import { IconContext } from "react-icons";
import { MdCopyAll } from "react-icons/md";

import { loginEndpoint } from "../../spotify";
import "./login.css";

const Login = () => {
	const username = "31fsupjdqsgcunivymozhysmqyi4";
	const password = "demo1234";

	const success = (copiedText) => {
		message.success(`${copiedText} copied successfuly`);
	};

	const handleCopyToClipboard = (text, field) => {
		navigator.clipboard.writeText(text);
		success(field);
	};

	return (
		<div className="login-page">
			<img
				src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
				alt="Login"
				className="logo"
			/>
			<div>
				<div className="login-instructions">
					<p>
						This app can be used with your personal spotify
						developer account, or used with a demo account provided
						below.
					</p>
					<div className="login-details-container">
						<div>
							<b>Username:</b>
							<p>31fsupjdqsgcunivymozhysmqyi4</p>
							<button
								className="copy"
								onClick={() =>
									handleCopyToClipboard(username, "Username")
								}
							>
								<IconContext.Provider
									value={{ className: "copy-icon" }}
								>
									<MdCopyAll />
								</IconContext.Provider>
							</button>
						</div>
						<div>
							<b>Password:</b>
							<p>demo1234</p>
							<button
								className="copy"
								onClick={() =>
									handleCopyToClipboard(password, "Password")
								}
							>
								<IconContext.Provider
									value={{ className: "copy-icon" }}
								>
									<MdCopyAll />
								</IconContext.Provider>
							</button>
						</div>
					</div>
				</div>
			</div>
			<a href={loginEndpoint}>
				<div className="login-btn">Login</div>
			</a>
		</div>
	);
};

export default Login;
