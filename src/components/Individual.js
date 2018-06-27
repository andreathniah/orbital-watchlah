import React from "react";
import PollMain from "./PollMain";
import Sidebar from "./Sidebar";

class Individual extends React.Component {
	render() {
		const { nickname } = this.props.match.params;
		return (
			<div>
				<Sidebar match={this.props.match} />
				hello {nickname}
				<PollMain user={nickname} match={this.props.match} />
			</div>
		);
	}
}

export default Individual;
