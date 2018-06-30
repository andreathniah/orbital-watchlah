import React from "react";
import PollButton from "./PollButton";
import PollBar from "./PollBar";
import base from "../../base";

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
		const {
			details,
			index,
			user,
			roomId,
			upvoteMovie,
			downvoteMovie,
			toggleDetails
		} = this.props;

		var status =
			typeof this.props.details !== "undefined" ? details.status : null;

		return (
			<div>
				<PollButton
					user={user}
					index={index}
					status={status}
					roomId={roomId}
					upvoteMovie={upvoteMovie}
					downvoteMovie={downvoteMovie}
				/>
				<PollBar details={this.state.moviebox} toggleDetails={toggleDetails} />
			</div>
		);
	}
}

export default PollItem;
