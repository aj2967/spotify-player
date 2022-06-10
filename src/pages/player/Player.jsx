import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AudioPlayer from "../../components/audioPlayer/AudioPlayer";
import Queue from "../../components/queue/Queue";
import SongCard from "../../components/songCard/SongCard";
import Suggestions from "../../components/suggestions/Suggestions";
import apiClient from "../../spotify";

import "./player.css";

const Player = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [tracks, setTracks] = useState([]);
	const [currentTrack, setCurrentTrack] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [musicSrc, setMusicSrc] = useState(null);

	useEffect(() => {
		if (location.state) {
			let dataSrc = location.state.from;

			switch (dataSrc) {
				case "library":
					apiClient
						.get(`playlists/${location?.state?.id}/tracks`)
						.then((res) => {
							setTracks(res?.data?.items);
							setCurrentTrack(res?.data?.items[0]?.track);
						});
					setMusicSrc(dataSrc);
					break;
				case "search":
					apiClient
						.get(`/tracks/${location?.state?.id}`)
						.then((res) => {
							setCurrentTrack(res?.data);
						});
					setMusicSrc(dataSrc);
					break;
				default:
					break;
			}
		}
	}, [location?.state, location?.state?.id]);

	useEffect(() => {
		setCurrentTrack(tracks[currentIndex]?.track);
	}, [currentIndex, tracks]);

	return (
		<div className="screen-container player">
			<div className="left-player-body">
				<div className="left-top-player-body">
					<AudioPlayer
						currentTrack={currentTrack}
						total={tracks}
						currentIndex={currentIndex}
						setCurrentIndex={setCurrentIndex}
					/>
				</div>
				<div className="left-bottom-player-body">
					<Suggestions title="New Releases" />
					{/* <Suggestions country="US" title="US" /> */}
				</div>
			</div>
			<div className="right-player-body">
				<SongCard album={currentTrack?.album} />

				{musicSrc === "library" ? (
					<Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Player;