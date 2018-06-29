import React from "react";
import { proxyURL, omdKey, mdbKey } from "../../secret";

class FetchMovies extends React.Component {
	state = {
		databox: []
	};

	componentDidMount() {
		this.fetchData();
	}

	// fetch call to obtain all JSON objects of currently showing movies
	fetchData = () => {
		const str = this.props.name;
		const title = str.replace(/\s+/g, "+").toLowerCase();
		const APIKey = omdKey;
		const year = 2018;
		const requestedURL =
			"omdbapi.com/?t=" + title + "&y=" + year + "&plot=full&apikey=" + APIKey;

		fetch(proxyURL + requestedURL)
			.then(results => {
				return results.json();
			})
			.then(data => {
				if (data.Response === "True") {
					this.setState(
						prevState => ({ databox: data }),
						() => {
							this.fetchPoster(data.imdbID);
						}
					);
				}
			})
			.catch(error => console.log("parsing failed ", error));
	};

	fetchPoster = imdbID => {
		const requestedURL =
			"api.themoviedb.org/3/find/" +
			imdbID +
			"?api_key=" +
			mdbKey +
			"&external_source=imdb_id";

		fetch(proxyURL + requestedURL)
			.then(results => {
				return results.json();
			})
			.then(data => {
				if (typeof data !== "undefined") {
					const path = data.movie_results[0];
					const posterURL =
						"http://image.tmdb.org/t/p/w500/" + path.poster_path;

					const databox = { ...this.state.databox };
					databox.Poster = posterURL;
					databox.mdbID = `${path.id}`;
					this.setState(
						prevState => ({ databox: databox }),
						() => {
							this.fetchTrailers(path.id);
						}
					);
				}
			})
			.catch(error => console.log("poster replacement error"));
	};

	fetchTrailers = mdbID => {
		const requestedURL =
			"api.themoviedb.org/3/movie/" + mdbID + "/videos?api_key=" + mdbKey;
		fetch(proxyURL + requestedURL)
			.then(results => {
				return results.json();
			})
			.then(data => {
				if (typeof data !== "undefined") {
					const databox = { ...this.state.databox };
					// https://www.youtube.com/watch?v={key}
					databox.Trailers = data.results;
					this.setState(
						prevState => ({ databox: databox }),
						() => {
							this.props.addData(this.state.databox);
							this.props.createGlobalList(this.state.databox);
						}
					);
				}
			})
			.catch(error => console.log("trailer fetch error ", error));
	};

	render() {
		return <div>{null}</div>;
	}
}

export default FetchMovies;
