import placeholderAlbum from "../../assets/images/placeholderAlbum.png";
import "./albumImage.css";

const AlbumImage = ({ url }) => {
	return (
		<div className="albumImage">
			<img
				src={url || placeholderAlbum}
				alt="Album Art"
				className="albumImage-art"
			/>
		</div>
	);
};

export default AlbumImage;