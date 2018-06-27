import React from "react";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
	render() {
		const { roomId } = this.props.match.params;
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
				</div>
			</div>
		);
	}
}

export default Sidebar;
