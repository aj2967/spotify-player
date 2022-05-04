import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";

import apiClient from "../../spotify";
import Loading from "../../components/loading/Loading";
import "./search.css";

const Search = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const [search, setSearch] = useState(null);
	const [userSearched, setUserSearched] = useState(0);
	const [type, setType] = useState("track");
	const [offset, setOffset] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const searchResultsDiv = useRef();

	useEffect(() => {
		apiClient
			.get(`search?q=${search}&type=${type}&limit=10&offset=${offset}`)
			.then((res) => {
				setTotalPages(res?.data?.tracks?.total);
				setSearchResult(res?.data?.tracks?.items);
				setIsLoading(false);
			});
		searchResultsDiv.current.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [userSearched, type, offset]);

	const handleSearch = (e) => {
		e.preventDefault();

		setIsLoading(true);
		setUserSearched(userSearched + 1);
	};

	const handleDate = (date) => {
		const newDate = new Date(date).toLocaleDateString("en-us", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});

		return newDate;
	};

	const playPlaylist = (id) => {
		navigate("/player", { state: { id: id, from: "search" } });
	};

	return (
		<div className="screen-container">
			<div className="search-container">
				<div className="search-form">
					<form onSubmit={handleSearch}>
						<input
							type="text"
							className="user-search"
							placeholder="Search"
							onChange={(e) => setSearch(e.target.value)}
						/>
						<IconContext.Provider
							value={{ size: "40px", className: "search-btn" }}
						>
							<BiSearch />
						</IconContext.Provider>
						{/* <select
							className="user-select"
							onChange={(e) => setType(e.currentTarget.value)}
						>
							<option value="track">Tracks</option>
							<option value="album">Album</option>
						</select> */}
					</form>
				</div>
				<div className="search-results" ref={searchResultsDiv}>
					{isLoading === true ? (
						<Loading />
					) : (
						<div>
							<li className="result disabled">
								<div className="result-img-container">
									<p>Track Cover</p>
								</div>
								<div className="result-name-container">
									<p>Track</p>
								</div>
								<div className="result-album-container">
									<p>Album</p>
								</div>
								<div className="result-date-container">
									<p>Released</p>
								</div>
							</li>
							{searchResult.map((item, i) => (
								<li
									className="result"
									key={i}
									onClick={() => playPlaylist(item?.id)}
								>
									<div className="result-img-container">
										<img
											src={item?.album?.images[0]?.url}
											alt=""
										/>
									</div>
									<div className="result-name-container">
										<p>{item?.name}</p>
									</div>
									<div className="result-album-container">
										<p>{item?.album?.name}</p>
									</div>
									<div className="result-date-container">
										<p>
											{handleDate(
												item?.album?.release_date
											)}
										</p>
									</div>
								</li>
							))}
						</div>
					)}
				</div>
				<div className="load-button-container">
					<button
						className="btn-effect-down"
						onClick={() => setOffset(offset + 10)}
					>
						Load Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Search;
