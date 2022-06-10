import { useEffect, useState } from "react";
import Slider from "react-slick";

import apiClient from "../../spotify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./suggestions.css";

const Suggestions = ({ title }) => {
	const [playlists, setPlaylists] = useState(null);

	useEffect(() => {
		apiClient.get(`browse/new-releases`).then((res) => {
			setPlaylists(res?.data?.albums?.items);
		});
	}, []);

	const settings = {
		dots: false,
		arrows: false,
		draggable: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 1000,
		pauseOnFocus: false,
		pauseOnHover: false,
		// cssEase: "linear",
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="suggestions">
			<div className="suggestions-title">
				<h1>{title}</h1>
			</div>
			<Slider {...settings} id="suggestions-slider">
				{playlists?.map((album) => (
					<div className="card">
						<div className="card-top">
							<img
								src={album?.images[1]?.url}
								alt={album?.name}
							/>
							<div className="card-bottom">
								<b>{album?.name}</b>
								<p>{album?.artists[0]?.name}</p>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Suggestions;
