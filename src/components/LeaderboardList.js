import React from "react";
import PollStatus from "./PollStatus";
import ItemVote from "./ItemVote";

class LeaderboardList extends React.Component {
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
		return (
			<div id="leaderboard-item" className="col-md-3 box-shadow">
				<div className="card md-3">
					<img
						className="card-img-top"
						src={this.props.details.Poster}
						alt={this.props.details.Title}
					/>
					<PollStatus
						index={this.props.index}
						addToPoll={this.addToPoll}
						removeFromBox={this.props.removeFromBox}
						roomId={this.props.roomId}
						toggle={this.props.toggle}
					/>
				</div>

				<div className="card-body">
					<ItemVote
						index={this.props.index}
						details={this.props.details}
						roomId={this.props.roomId}
						editGlobalVote={this.props.editGlobalVote}
					/>
					<br />
				</div>
			</div>
		);
	}
}

export default LeaderboardList;
