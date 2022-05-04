import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from 'react-icons/ai'

import apiClient from "../../spotify";
import "./library.css";

const Library = () => {
    const navigate = useNavigate()
	const [playlists, setPlaylists] = useState(null);

	useEffect(() => {
		apiClient.get("me/playlists").then((res) => {
			setPlaylists(res?.data.items);
		});
	}, []);

    const playPlaylist = id => {
        navigate("/player", { state: { id: id, from: "library" } });
    }

	return (
		<div className="screen-container">
			<div className="library-body">
				{playlists?.map((playlist) => (
					<div
						className="playlist-card"
						key={playlist?.id}
						onClick={() => playPlaylist(playlist?.id)}
					>
						<img
							src={playlist?.images[0]?.url}
							alt={playlist?.name}
							className="playlist-image"
						/>
						<p className="playlist-title">{playlist?.name}</p>
						<p className="playlist-subtitle">
							{playlist?.tracks?.total} Songs
						</p>
						<div className="playlist-fade">
							<IconContext.Provider
								value={{ size: "50px", color: "50C878" }}
							>
								<AiFillPlayCircle />
							</IconContext.Provider>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Library;