import React from "react";
import PollMain from "./PollMain";
import Sidebar from "./Sidebar";

class Polls extends React.Component {
	render() {
		return (
			<div>
				<Sidebar match={this.props.match} />
				<PollMain user="admin" match={this.props.match} />;
			</div>
		);
	}
}

export default Polls;
