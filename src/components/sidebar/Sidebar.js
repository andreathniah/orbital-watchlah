import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";

class Sidebar extends React.Component {
	render() {
		const { roombox, match, removeFromBox, toggle } = this.props;
		const { roomId } = match.params;

		const item = Object.keys(roombox).map(id => {
			return (
				<SidebarItem
					id="sidebar-item"
					key={id}
					index={id}
					details={roombox[id]}
					removeFromBox={removeFromBox}
					toggle={toggle}
				/>
			);
		});

		return (
			<div>
				<div>
					<Link to={`/${roomId}/movies`}>Movie Details</Link>
				</div>
				<div>
					<Link to={`/${roomId}/leaderboard`}>Leaderboard</Link>
				</div>
				<div>
					<Link to={`/${roomId}/polls`}>Polls</Link>
					{item}
				</div>
				<br />
			</div>
		);
	}
}

export default Sidebar;
