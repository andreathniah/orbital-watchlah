import React from "react";
import PollStatus from "./PollStatus";
import ItemVote from "./ItemVote";
import "./grid.css";
import "./LeaderboardItem.css";

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

	onImageError = event => {
		event.target.src = "/images/default-poster.png";
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
			<div className="col span-1-of-3">
				<div>
					<img
						src={details.Poster}
						alt={details.Title}
						onError={this.onImageError}
						className="posters"
					/>
					<PollStatus
						index={index}
						addToPoll={this.addToPoll}
						removeFromBox={removeFromBox}
						roomId={roomId}
						toggle={toggle}
					/>
				</div>

				<div>
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
