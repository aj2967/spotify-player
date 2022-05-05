import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { notification } from "antd";

import "./audioPlayer.css";
import Controls from "./Controls";
import ProgressCircle from "./ProgressCircle";
import WaveAnimation from "./WaveAnimation";

const AudioPlayer = ({
	currentTrack,
	currentIndex,
	setCurrentIndex,
	total,
}) => {
	const location = useLocation();
	const [isPlaying, setIsPlaying] = useState(false);
	const [trackProgress, setTrackProgress] = useState(0);
	let audioSrc = total[currentIndex]?.track?.preview_url;
	const audioRef = useRef(new Audio(currentTrack?.preview_url));
	const intervalRef = useRef();
	const isReady = useRef(false);
	const { duration } = audioRef.current;
	const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
	const artists = [];
	currentTrack?.album?.artists?.forEach((artist) => {
		artists.push(artist.name);
	});

	useEffect(() => {
		switch (location?.state?.from) {
			case "library":
				audioSrc = total[currentIndex]?.track?.preview_url;
				break;
			case "search":
				audioSrc = currentTrack?.preview_url;
				break;
			default:
				break;
		}
	}, [isPlaying]);

	useEffect(() => {
		if (audioRef.current.src) {
			if (isPlaying) {
				audioRef.current.play();
				startTimer();
			} else {
				clearInterval(intervalRef.current);
				audioRef.current.pause();
			}
		} else {
			if (isPlaying) {
				audioRef.current = new Audio(audioSrc);
				audioRef.current.play();
				startTimer();
			} else {
				clearInterval(intervalRef.current);
				audioRef.current.pause();
			}
		}
	}, [isPlaying]);

	useEffect(() => {
		audioRef.current.pause();
		audioRef.current = new Audio(audioSrc);

		setTrackProgress(audioRef.current.currentTime);

		if (isReady.current) {
			setIsPlaying(true);
			audioRef.current.play();
			startTimer();
		} else {
			isReady.current = true;
		}
	}, [currentIndex]);

	useEffect(() => {
		if (audioRef.current.src.includes("null")) {
			openNotificationUnsupportedTrack("warning");
			// console.log(total[currentIndex].track.name);
		}
	}, [currentIndex, isPlaying]);

	useEffect(() => {
		setIsPlaying(false);
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		};
	}, []);

	const startTimer = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				handleNext();
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, [1000]);
	};

	const handleNext = () => {
		if (location?.state?.from === "library") {
			if (currentIndex < total.length - 1) {
				setCurrentIndex(currentIndex + 1);
			} else {
				setCurrentIndex(0);
			}
		}
	};

	const handlePrev = () => {
		if (location?.state?.from === "library") {
			if (currentIndex - 1 < 0) {
				setCurrentIndex(total.length - 1);
			} else {
				setCurrentIndex(currentIndex - 1);
			}
		}
	};

	const openNotificationUnsupportedTrack = (type) => {
		notification[type]({
			message: `${
				total[currentIndex]?.track?.name || "This track"
			} has no supported audio source`,
			description: ``,
			className: "notification glass",
			duration: 2,
		});
	};

	const addZero = (number) => {
		return number < 9 ? "0" + number : number;
	};

	return (
		<div className="player-body">
			<div className="player-left-body">
				<div className="progress-circle-container">
					<ProgressCircle
						percentage={currentPercentage}
						isPlaying={true}
						image={currentTrack?.album?.images[0]?.url}
						size={200}
						color="#C3B1E1"
					/>
				</div>
			</div>
			<div className="player-right-body">
				<p className="song-title">{currentTrack?.name}</p>
				<p className="song-artist">{artists.join(" | ")}</p>
				<div className="player-right-bottom">
					<div className="song-duration">
						<p className="duration">
							0:{addZero(Math.round(trackProgress))}
						</p>
						<WaveAnimation isPlaying={isPlaying} />
						<p className="duration">0:30</p>
					</div>
					<Controls
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						handleNext={handleNext}
						handlePrev={handlePrev}
						total={total}
					/>
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
