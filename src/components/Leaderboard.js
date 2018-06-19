import React from "react";
import base from "../base";
import LeaderboardList from "./LeaderboardList";
import Sidebar from "./Sidebar";

class Leaderboard extends React.Component {
	state = {
		globalbox: [],
		start: false,
		toggle: null,
		roombox: []
	};

	componentDidMount() {
		this.ref = base.syncState(`globalList/`, {
			context: this,
			state: "globalbox",
			then() {
				this.deleteStuff(this.state.globalbox);
				console.log("loading completed");
				this.setState({ start: true });
			}
		});

		this.ref = base.syncState(`rooms/${this.props.match.params.roomId}`, {
			context: this,
			state: "roombox"
		});
	}

	deleteStuff = globalbox => {
		Object.entries(globalbox)
			.filter(([key, val]) => !val.UpdateStatus)
			.map(([key, val]) => key)
			.forEach(key => {
				console.log("deleting " + key);
				globalbox[key] = null;
			});
		this.setState({ globalbox: globalbox });
	};

	addToBox = (item, index) => {
		const roombox = { ...this.state.roombox };
		roombox[index] = item;
		this.setState({ roombox: roombox });
	};

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

	editGlobalVote = (index, value, status) => {
		const globalbox = { ...this.state.globalbox };
		const render = Object.keys(globalbox).filter(key => key === "Room");
		if (!render) {
			var room = [];
		} else {
			var room = { ...this.state.room };
		}
		room[this.props.match.params.roomId] = {
			status: status
		};

		console.log(room);
		globalbox[index] = {
			Title: globalbox[index].Title,
			UpdateStatus: globalbox[index].UpdateStatus,
			WatchVote: value,
			Room: room
		};
		this.setState({ globalbox: globalbox });
	};

	// to faciliate toggling PollStatus's button
	toggle = index => {
		this.setState(
			prevState => ({
				toggle: index
			}),
			() => {
				this.setState({ state: this.state });
			}
		);
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
			<div>
				<Sidebar roomId={this.props.match.params.roomId} toggle={this.toggle} />
				<div id="main">{this.state.start ? leaderboardItem : null}</div>
			</div>
		);
	}
}

export default Leaderboard;
