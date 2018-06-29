import React from "react";
import MovieCard from "./MovieCard";
import PollStatus from "./PollStatus";
import ItemVote from "./ItemVote";

class MovieItem extends React.Component {
	// creation of new poll item containing individual votes, used for Leaderboard.js
	// pre-cond:  movie's Id from PollStatus.js
	// equivalent to those found on LeaderboardList.js
	addToPoll = index => {
		console.log("adding " + index);
		const item = {
			Title: this.props.dataDetails.Title,
			Votes: 0 // this vote is for customised poll later
		};
		this.props.addToBox(item, index);
	};

	render() {
		const {
			globalDetails,
			editGlobalVote,
			dataDetails,
			index,
			removeFromBox,
			roomId,
			toggle
		} = this.props;

		const path = globalDetails[index];
		const voteItem =
			typeof path !== "undefined" ? (
				<ItemVote
					index={index}
					roomId={roomId}
					editGlobalVote={editGlobalVote}
					details={path}
				/>
			) : null;

		return (
			<div>
				<MovieCard details={dataDetails} />
				<PollStatus
					index={index}
					addToPoll={this.addToPoll}
					removeFromBox={removeFromBox}
					roomId={roomId}
					toggle={toggle}
				/>
				{voteItem}
			</div>
		);
	}
}

export default MovieItem;
