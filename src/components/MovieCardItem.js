import React from "react";
import RatingItem from "./RatingItem";
import PollStatus from "./PollStatus";
import ItemVote from "./ItemVote";

class MovieCardItem extends React.Component {
	onImageError = event => {
		event.target.src = "/images/default-poster.png";
	};

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
		const { Plot, Poster, Ratings, Released, Title } = this.props.dataDetails;
		if (typeof Ratings !== "undefined") {
			var ratingItem = Object.keys(Ratings).map(id => {
				const uniqueId = "" + this.props.index + "-" + id;
				return <RatingItem key={uniqueId} ratings={Ratings[id]} />;
			});
		}

		const path = this.props.globalDetails[this.props.index];
		const voteItem =
			typeof path !== "undefined" ? (
				<ItemVote
					index={this.props.index}
					roomId={this.props.roomId}
					editGlobalVote={this.props.editGlobalVote}
					details={path}
				/>
			) : null;

		return (
			<div id="movie-card-item" className="container-fluid row">
				<div className="movie-poster col-md-3">
					<img
						className="resize-image"
						src={Poster}
						alt={this.props.index}
						onError={this.onImageError}
					/>
				</div>
				<div className="movie-content col-md-9">
					<div className="movie-released">{Released}</div>
					<div className="movie-title">{Title}</div>
					<div className="movie-plot">{Plot}</div>
					{ratingItem}

					<PollStatus
						index={this.props.index}
						addToPoll={this.addToPoll}
						removeFromBox={this.props.removeFromBox}
						roomId={this.props.roomId}
						toggle={this.props.toggle}
					/>
					{voteItem}
				</div>
			</div>
		);
	}
}

export default MovieCardItem;
