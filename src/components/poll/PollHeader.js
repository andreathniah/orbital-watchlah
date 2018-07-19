import React from "react";
import { Link } from "react-router-dom";
import "./PollHeader.css";

class PollHeader extends React.Component {
	state = {
		display: false
	};

	displayMembers = () => {
		this.setState(prevState => ({ display: !prevState.display }));
	};

	render() {
		const { roomId, details } = this.props;
		const noMembers = Object.keys(details).length;
		const item = Object.keys(details).map(id => id + "\n");

		return (
			<div>
				<div className = "addBorder">
					<h2>{roomId}</h2>
					<p>
						Sharable Link: <Link to={`/${roomId}/share`} className="link">/{roomId}/share</Link>
					</p>
				</div>
				<div onClick={this.displayMembers}  className="centre">
					<h3>{noMembers}</h3>
					Member(s)
				</div>
				{this.state.display ? alert(item) : null}
			</div>
		);
	}
}

export default PollHeader;
