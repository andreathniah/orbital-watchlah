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
			toggleDetails
		} = this.props;

		var status =
			typeof this.props.details !== "undefined" ? details.status : false;

		return (
			<div>
				<PollButton
					index={index}
					user={user}
					status={status}
					roomId={roomId}
					upvoteMovie={upvoteMovie}
				/>
				<PollBar details={this.state.moviebox} toggleDetails={toggleDetails} />
			</div>
		);
	}
}

export default PollItem;
