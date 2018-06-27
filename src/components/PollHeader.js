import React from "react";
import { Link } from "react-router-dom";

class PollHeader extends React.Component {
	render() {
		const { roomId } = this.props;
		return (
			<div>
				<h3>{roomId}</h3>
				<p>
					Sharable Link: <Link to={`/${roomId}/share`}>/{roomId}/share</Link>
				</p>
			</div>
		);
	}
}

export default PollHeader;
