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
			memberbox,
			roombox,
			userbox,
			index,
			user,
			roomId,
			upvoteMovie,
			downvoteMovie,
			toggleDetails,
			disableStatus
		} = this.props;

		var status = typeof memberbox !== "undefined" ? memberbox.Status : false;
		var hello =
			disableStatus === -1 || index === disableStatus[0] ? false : true;

		const totalMember = Object.keys(userbox).length;
		const totalVotes = roombox.Votes;
		var percentage = (totalVotes / totalMember) * 100;

		return (
			<div className="flex-row">
				<PollButton
					user={user}
					index={index}
					status={status}
					roomId={roomId}
					upvoteMovie={upvoteMovie}
					downvoteMovie={downvoteMovie}
					disableStatus={hello}
				/>
				<PollBar
					moviebox={this.state.moviebox}
					roombox={roombox}
					percentage={percentage}
					toggleDetails={toggleDetails}
				/>
			</div>
		);
	}
}

export default PollItem;
