import "./albumInfo.css";

const AlbumInfo = ({ album }) => {
	const artists = [];
	album?.artists?.forEach((element) => {
		artists.push(element?.name);
	});

	return (
		<div className="albumInfo-card">
			<div className="albumName-container">
				<marquee className="marquee">
					<p>{`${album?.name} - ${artists?.join(", ")}`}</p>
				</marquee>
			</div>
			<div className="album-release">
				<p>Release Date: {album?.release_date}</p>
			</div>
		</div>
	);
};

export default AlbumInfo;
