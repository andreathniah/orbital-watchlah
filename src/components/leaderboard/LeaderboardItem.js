import React from "react";
import PollStatus from "./PollStatus";
import ItemVote from "./ItemVote";

class LeaderboardItem extends React.Component {
	// creation of new poll item containing individual votes, used for Leaderboard.js
	// pre-cond:  movie's Id from PollStatus.js
	addToPoll = index => {
		console.log("adding " + index);
		const item = {
			Title: this.props.details.Title,
			Votes: 0 // this vote is for customised poll later
		};
		this.props.addToBox(item, index);
	};

	render() {
		const {
			details,
			index,
			removeFromBox,
			roomId,
			toggle,
			editGlobalVote
		} = this.props;

		return (
			<div id="leaderboard-item" className="col-md-3 box-shadow">
				<div className="card md-3">
					<img
						className="card-img-top"
						src={details.Poster}
						alt={details.Title}
					/>
					<PollStatus
						index={index}
						addToPoll={this.addToPoll}
						removeFromBox={removeFromBox}
						roomId={roomId}
						toggle={toggle}
					/>
				</div>

				<div className="card-body">
					<ItemVote
						index={index}
						details={details}
						roomId={roomId}
						editGlobalVote={editGlobalVote}
					/>
					<br />
				</div>
			</div>
		);
	}
}

export default LeaderboardItem;
