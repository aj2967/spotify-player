import "./albumInfo.css";

const AlbumInfo = ({ album }) => {
	const artists = [];
	album?.artists?.forEach((element) => {
		artists.push(element?.name);
	});

	return (
		<div className="albumInfo-card">
			<marquee scrollamount="3">
				<p>{`${album?.name || "Unkown Album"} | Released ${
					album?.release_date || "Unknown"
				} | ${album?.album_type || "Unknown Type"} | By ${
					artists?.join(", ") || "Unknown Artists"
				}`}</p>
			</marquee>
		</div>
	);
};

export default AlbumInfo;
