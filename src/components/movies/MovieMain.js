import React from "react";
import base from "../../base";
import MovieItem from "./MovieItem";
import './MovieMain.css';

class MovieMain extends React.Component {
	state = {
		globalbox: [],
		moviebox: []
	};

	componentDidMount() {
		// need to remind users to refresh if no data is shown
		const dateObj = new Date();
		const todayDate =
			"" +
			dateObj.getUTCDate() +
			dateObj.getUTCMonth() +
			dateObj.getUTCFullYear();

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

	render() {
		const { moviebox, globalbox } = this.state;
		const { removeFromBox, addToBox, match, toggle } = this.props;

		// individual movie details card
		const card = Object.keys(moviebox).map(id => {
			return (
				<MovieItem
					key={id}
					index={id}
					dataDetails={moviebox[id]}
					globalDetails={globalbox}
					removeFromBox={removeFromBox}
					addToBox={addToBox}
					roomId={match.params.roomId}
					toggle={toggle}
					editGlobalVote={this.editGlobalVote}
				/>
			);
		});

		return <div>{card}</div>;
	}
}

export default MovieMain;
