import React from "react";
import { Link } from "react-router-dom";
import base from "../base";
import SidebarItem from "./SidebarItem";

class Sidebar extends React.Component {
	state = {
		roombox: [] // contains user specific information
	};

	componentDidMount() {
		const { match } = this.props;
		const roomId = match.params.roomId;
		this.ref = base.syncState(`rooms/${roomId}`, {
			context: this,
			state: "roombox"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		const { roombox } = this.state;
		const { match } = this.props;
		const item = Object.keys(roombox).map(id => {
			return (
				<SidebarItem
					id="sidebar-item"
					key={id}
					index={id}
					details={roombox[id]}
					removeFromBox={this.props.removeFromBox}
					toggle={this.props.toggle}
				/>
			);
		});

		return (
			<div id="sidebar-main" className="col-md-2">
				<div id="sidebar-link">
					<Link to={`${match.url}/movies`}>Movie Details</Link>
				</div>
				<div id="sidebar-link">
					<Link to={`${match.url}`}>Leaderboard</Link>
				</div>
				<div id="sidebar-link">
					<Link to={`${match.url}/polls`}>Polls</Link>
					{item}
				</div>
				<br />
			</div>
		);
	}
}
export default Sidebar;
