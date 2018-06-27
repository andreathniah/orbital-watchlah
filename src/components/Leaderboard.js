import React from "react";
import Sidebar from "./Sidebar";

class Leaderboard extends React.Component {
	render() {
		return (
			<div>
				<Sidebar match={this.props.match} />
				<div>Leaderboard</div>
			</div>
		);
	}
}

export default Leaderboard;
