import React from "react";
import base from "../../base";
import LeaderboardItem from "./LeaderboardItem";

class LeaderboardMain extends React.Component {
	state = {
		start: false,
		globalbox: [] // contains global information used by all users
	};

	componentDidMount() {
		this.ref = base.syncState(`globalbox/`, {
			context: this,
			state: "globalbox",
			then() {
				this.deleteOldMovies(this.state.globalbox);
				this.setState({ start: true });
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// delete movies identified as not currently showing anymore at FetchJSON.js
	deleteOldMovies = globalbox => {
		Object.entries(globalbox)
			.filter(([key, val]) => !val.UpdateStatus)
			.map(([key, val]) => key)
			.forEach(key => {
				console.log("deleting " + key);
				globalbox[key] = null;
			});
		this.setState({ globalbox: globalbox });
	};

	// updating globalvotes and noting which specific rooms voted
	// pre-cond: movies Id, new vote value,  vote status (voted 1/0/-1)
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
		const { globalbox } = this.state;
		const { toggle, match, addToBox, removeFromBox } = this.props;

		const leaderboardItem = Object.keys(globalbox).map(id => {
			return (
				<LeaderboardItem
					key={id}
					index={id}
					details={globalbox[id]}
					toggle={toggle}
					roomId={match.params.roomId}
					addToBox={addToBox}
					removeFromBox={removeFromBox}
					editGlobalVote={this.editGlobalVote}
				/>
			);
		});

		return (
			<div>
				<div>{this.state.start ? leaderboardItem : null}</div>
			</div>
		);
	}
}

export default LeaderboardMain;
