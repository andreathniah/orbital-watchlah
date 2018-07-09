import React from "react";
import { Link } from "react-router-dom";

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
				<div>
					<h2>{roomId}</h2>
					<p>
						Sharable Link: <Link to={`/${roomId}/share`}>/{roomId}/share</Link>
					</p>
				</div>
				<div onClick={this.displayMembers}>
					<h3>{noMembers}</h3>
					Member(s)
				</div>
				{this.state.display ? alert(item) : null}
			</div>
		);
	}
}

export default PollHeader;
