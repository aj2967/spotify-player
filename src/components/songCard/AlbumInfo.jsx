import "./albumInfo.css";

const AlbumInfo = ({ album }) => {
	console.log(album);
	const artists = [];
	album?.artists?.forEach((element) => {
		artists.push(element?.name);
	});

	return (
		<div className="albumInfo-card">
			<marquee scrollamount="3">
				<p>{`${album?.name} | Released ${album?.release_date} | ${
					album?.album_type
				} | By ${artists?.join(", ")}`}</p>
			</marquee>
		</div>
	);
};

export default AlbumInfo;
