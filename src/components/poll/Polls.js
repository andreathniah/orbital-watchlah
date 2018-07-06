import React from "react";
import base from "../../base";
import PollMain from "./PollMain";
import Sidebar from "../sidebar/Sidebar";

class Polls extends React.Component {
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
					<PollMain user="admin" match={this.props.match} />
				</div>
			</div>
		);
	}
}

export default Polls;
