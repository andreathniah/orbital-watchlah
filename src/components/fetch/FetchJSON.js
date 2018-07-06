import React from "react";
import FetchTitles from "./FetchTitles";

import base from "../../base";
import { firebaseApp } from "../../base";

class FetchJSON extends React.Component {
	state = {
		initiateScrape: false, // to start scraping from stretch
		initiateUpdate: false, // to identify old movies that should be deleted
		initiateFlip: false, // to flip updateStatus to true to flag as current movies
		moviebox: [], // contains JSON object of movie details information
		globalbox: [] // contains global information used by all users
	};

	componentDidMount() {
		const dateObj = new Date();
		const todayDate =
			"" +
			dateObj.getUTCDate() +
			dateObj.getUTCMonth() +
			dateObj.getUTCFullYear();

		const database = firebaseApp.database().ref("moviebox");

		database.once("value", snapshot => {
			if (snapshot.exists()) {
				database.child(todayDate).once("value", snapshot => {
					if (snapshot.exists()) {
						console.log("retrieving data from database...");
						this.setState({ initiateFlip: true });
					} else {
						console.log("old data found, deleting and re-scraping...");
						database.remove();
						this.setState({ initiateScrape: true, initiateUpdate: true });
					}
				});
			} else {
				console.log("scraping in progress...");
				this.setState({ initiateScrape: true, initiateFlip: true });
			}
		});

		this.ref = base.syncState(`moviebox/${todayDate}`, {
			context: this,
			state: "moviebox"
		});

		this.ref = base.syncState(`globalbox/`, {
			context: this,
			state: "globalbox"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ count: nextProps.value });
		}
	}

	// adding movie details JSON object to moviebox
	// pre-cond: movie details information JSON object from FetchMovies.js
	addData = data => {
		const moviebox = { ...this.state.moviebox };
		moviebox[data.imdbID] = data;
		this.setState({
			moviebox: moviebox
		});
	};

	// default global (for all users) information
	// pre-cond: movie details information JSON object from FetchMovies.js
	createGlobalList = data => {
		const globalbox = { ...this.state.globalbox };
		globalbox[data.imdbID] = {
			Title: data.Title,
			Poster: data.Poster,
			WatchVote: 0,
			UpdateStatus: false
		};
		this.setState({ globalbox: globalbox });
	};

	// update old information with new one during re-scraping
	// pre-cond: movie details information JSON object from FetchMovies.js
	updateGlobalList = data => {
		const globalbox = { ...this.state.globalbox };

		if (globalbox.hasOwnProperty(data.imdbID)) {
			console.log("updating watch-votes...");
			const updatedVotes = globalbox[data.imdbID].WatchVote;

			globalbox[data.imdbID] = {
				Title: data.Title,
				WatchVote: updatedVotes,
				UpdateStatus: true // identified as current showing movies
			};
		}
		this.setState({ globalbox: globalbox });
	};

	render() {
		const { initiateScrape, initiateUpdate, initiateFlip } = this.state;
		return (
			<div>
				{initiateScrape && initiateUpdate && initiateFlip === false ? (
					<FetchTitles
						id="FetchTitles"
						addData={this.addData}
						createGlobalList={this.updateGlobalList}
					/>
				) : null}

				{initiateScrape && initiateFlip ? (
					<FetchTitles
						id="FetchTitles"
						addData={this.addData}
						createGlobalList={this.createGlobalList}
					/>
				) : null}

				{initiateFlip ? (
					<FetchTitles
						id="FetchTitles"
						addData={this.addData}
						createGlobalList={this.updateGlobalList}
					/>
				) : null}
			</div>
		);
	}
}

export default FetchJSON;
