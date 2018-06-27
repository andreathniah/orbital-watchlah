import React from "react";
import PollButton from "./PollButton";
import PollBar from "./PollBar";
import base from "../base";

class PollItem extends React.Component {
	state = {
		moviebox: []
	};

	componentDidMount() {
		const { index } = this.props;
		const dateObj = new Date();
		const todayDate =
			"" +
			dateObj.getUTCDate() +
			dateObj.getUTCMonth() +
			dateObj.getUTCFullYear();

		this.ref = base.syncState(`moviebox/${todayDate}/${index}`, {
			context: this,
			state: "moviebox"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		return (
			<div>
				<PollButton
					index={this.props.index}
					user={this.props.user}
					roomId={this.props.roomId}
					upvoteMovie={this.props.upvoteMovie}
				/>
				<PollBar
					details={this.state.moviebox}
					toggleDetails={this.props.toggleDetails}
				/>
			</div>
		);
	}
}

export default PollItem;
