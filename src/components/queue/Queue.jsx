import "./queue.css";

const Queue = ({ tracks, setCurrentIndex }) => {
	return (
		<div className="queue-container flex">
			<div className="queue">
				<p className="upNext">Tracks</p>
				<div className="queue-list">
					{tracks?.map((track, i) => (
						<div className="queue-item" key={i} onClick={() => setCurrentIndex(i)}>
							<p className="track-name">{track?.track?.name}</p>
							<p>0:30</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Queue;