import React from "react";
import Sidebar from "../sidebar/Sidebar";
import LeaderboardMain from "./LeaderboardMain";

class Leaderboard extends React.Component {
	render() {
		return (
			<div>
				<Sidebar match={this.props.match} />
				<LeaderboardMain />
			</div>
		);
	}
}

export default Leaderboard;
