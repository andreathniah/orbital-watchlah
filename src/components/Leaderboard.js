import React from "react";
import base from "../base";
import LeaderboardList from "./LeaderboardList";
import Sidebar from "./Sidebar";

class Leaderboard extends React.Component {
	state = {
		globalbox: [], // contains global information used by all users
		start: false, // completion status of old movies deletion
		toggle: null,
		roombox: [] // contains user specific information
	};

	componentDidMount() {
		this.ref = base.syncState(`globalList/`, {
			context: this,
			state: "globalbox",
			then() {
				this.deleteOldMovies(this.state.globalbox);
				console.log("loading completed");
				this.setState({ start: true });
			}
		});

		this.ref = base.syncState(`rooms/${this.props.match.params.roomId}`, {
			context: this,
			state: "roombox"
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

	// adding specified movie into users' customised polling list
	// pre-cond: movie's Id and item (name and individual votes) from LeaderboardList.js
	addToBox = (item, index) => {
		const roombox = { ...this.state.roombox };
		roombox[index] = item;
		this.setState({ roombox: roombox });
	};

	// removing specified movies from user's customised polling list
	// pre-cond: movies Id from PollStatus.js or SidebarItem.js
	removeFromBox = index => {
		console.log("removing " + index);
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
	toggle = index => {
		this.setState(prevState => ({ toggle: index }));
	};

	render() {
		const { globalbox, toggle } = this.state;

		const leaderboardItem = Object.keys(globalbox).map(id => {
			return (
				<LeaderboardList
					key={id}
					index={id}
					details={globalbox[id]}
					toggle={toggle}
					roomId={this.props.match.params.roomId}
					addToBox={this.addToBox}
					removeFromBox={this.removeFromBox}
					editGlobalVote={this.editGlobalVote}
				/>
			);
		});

		return (
			<div className="container-fluid">
				<div className="row">
					<Sidebar
						roomId={this.props.match.params.roomId}
						removeFromBox={this.removeFromBox}
						match={this.props.match}
						toggle={this.toggle}
					/>
					<div id="leaderboard-main" className="col-md-10">
						<div className="row">
							{this.state.start ? leaderboardItem : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Leaderboard;
