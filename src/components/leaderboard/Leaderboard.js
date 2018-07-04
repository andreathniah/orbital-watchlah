import React from "react";
import base from "../../base";
import Sidebar from "../sidebar/Sidebar";
import LeaderboardMain from "./LeaderboardMain";

class Leaderboard extends React.Component {
	state = {
		roombox: [],
		toggle: null
	};

	componentDidMount() {
		this.ref = base.syncState(`roombox/${this.props.match.params.roomId}`, {
			context: this,
			state: "roombox"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

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

	// to faciliate toggling PollStatus's button by forcing state to re-render
	// pre-cond: movies Id from SidebarItem.js
	toggle = index => {
		this.setState(prevState => ({ toggle: index }));
	};

	render() {
		return (
			<div>
				<div>
					<Sidebar
						match={this.props.match}
						roombox={this.state.roombox}
						removeFromBox={this.removeFromBox}
						toggle={this.toggle}
					/>
					<LeaderboardMain
						toggle={this.state.toggle}
						match={this.props.match}
						addToBox={this.addToBox}
						removeFromBox={this.removeFromBox}
					/>
				</div>
			</div>
		);
	}
}

export default Leaderboard;
