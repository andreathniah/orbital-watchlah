import React from "react";
import FetchMovies from "./FetchMovies";
import FetchTitlesBackup from "./FetchTitlesBackup";
import { proxyURL } from "../secret";

class FetchTitles extends React.Component {
	state = {
		titles: [] // containis all currently showing titles
	};

	componentDidMount() {
		this.fetchTitles();
	}

	// fetch call to obtain all titles of current showing movies
	fetchTitles = () => {
		const requestedURL = "insing.com/movies/now-showing/";

		fetch(proxyURL + requestedURL)
			.then(results => {
				return results.text();
			})
			.then(data => {
				console.log("Fetching movie titles...");
				const parser = new DOMParser();
				const httpDoc = parser.parseFromString(data, "text/html");
				const movieDDL = httpDoc
					.getElementsByClassName("movie-id")[1]
					.getElementsByTagName("li");
				const movieTitles = [];
				for (var i = 1; i < movieDDL.length; i++) {
					movieTitles.push(movieDDL[i].innerHTML);
				}
				return movieTitles;
			})
			.then(movieTitles => {
				this.setState({
					titles: movieTitles
				});
				console.log("Scraping completed.");
			})
			.catch(error => {
				console.log("Scraping failed due to ");
				console.log(error);
				console.log("Switching over to backup");
				<FetchTitlesBackup />;
			});
	};

	render() {
		var titleItem = this.state.titles.map(name => {
			return (
				<FetchMovies
					key={name}
					name={name}
					addData={this.props.addData}
					createGlobalList={this.props.createGlobalList}
				/>
			);
		});

		return <div>{titleItem}</div>;
	}
}

export default FetchTitles;
