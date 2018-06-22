import React from "react";
import base from "../base";
import Sidebar from "./Sidebar";
import MovieCardItem from "./MovieCardItem";

class MovieCard extends React.Component {
	state = {
		globalbox: [],
		databox: [],
		roombox: [],
		toggle: null
	};

	componentDidMount() {
		// need to remind users to refresh if no data is shown
		const dateObj = new Date();
		const todayDate =
			"" +
			dateObj.getUTCDate() +
			dateObj.getUTCMonth() +
			dateObj.getUTCFullYear();

		this.ref = base.syncState(`moviesJSON/${todayDate}`, {
			context: this,
			state: "databox"
		});

		this.ref = base.syncState(`rooms/${this.props.match.params.roomId}`, {
			context: this,
			state: "roombox"
		});

		this.ref = base.syncState(`globalList/`, {
			context: this,
			state: "globalbox"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// adding specified movie into users' customised polling list
	// pre-cond: movie's Id and item (name and individual votes) from LeaderboardList.js
	// equivalent to those found on Leaderboard.js
	addToBox = (item, index) => {
		const roombox = { ...this.state.roombox };
		roombox[index] = item;
		this.setState({ roombox: roombox });
	};

	// removing specified movies from user's customised polling list
	// pre-cond: movies Id from SidebarItem.js
	// equivalent to those found on Leaderboard.js
	removeFromBox = index => {
		const roombox = { ...this.state.roombox };

		Object.entries(roombox)
			.filter(([key, val]) => key === index)
			.map(([key, val]) => key)
			.forEach(key => {
				console.log("deleting " + key);
				roombox[key] = null;
			});
		this.setState({ roombox: roombox });
	};

	// updating globalvotes and noting which specific rooms voted
	// pre-cond: movies Id, new vote value,  vote status (voted 1/0/-1)
	// equivalent to those found on Leaderboard.js
	editGlobalVote = (index, value, status) => {
		const globalbox = { ...this.state.globalbox };
		const render = Object.keys(globalbox).filter(key => key === "Room");
		if (!render) {
			var room = []; // create new room when no rooms voted yet
		} else {
			var room = { ...this.state.room };
		}
		room[this.props.match.params.roomId] = {
			status: status
		};

		globalbox[index] = {
			Title: globalbox[index].Title,
			Poster: globalbox[index].Poster,
			UpdateStatus: globalbox[index].UpdateStatus,
			WatchVote: value,
			Room: room
		};
		this.setState({ globalbox: globalbox });
	};

	// to faciliate toggling PollStatus's button by forcing state to re-render
	// pre-cond: movies Id from SidebarItem.js
	// equivalent to those found on Leaderboard.js
	toggle = index => {
		this.setState(prevState => ({ toggle: index }));
	};

	render() {
		// individual movie details card
		const card = Object.keys(this.state.databox).map(id => {
			return (
				<MovieCardItem
					key={id}
					index={id}
					dataDetails={this.state.databox[id]}
					globalDetails={this.state.globalbox}
					removeFromBox={this.removeFromBox}
					addToBox={this.addToBox}
					roomId={this.props.match.params.roomId}
					toggle={this.toggle}
					editGlobalVote={this.editGlobalVote}
				/>
			);
		});

		return (
			<div className="container-fluid">
				<div className="row">
					<Sidebar
						removeFromBox={this.removeFromBox}
						match={this.props.match}
						toggle={this.toggle}
					/>
					<div id="details-main" className="col-md-10">
						{card}
					</div>
				</div>
			</div>
		);
	}
}

export default MovieCard;
