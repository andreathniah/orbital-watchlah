import React from "react";
import base from "../base";
import { firebaseApp } from "../base";

class ItemVote extends React.Component {
	state = {
		globalvote: this.props.details.WatchVote,
		upvote: false,
		downvote: false
	};

	componentDidMount() {
		const { details, roomId, index } = this.props;
		const { upvote, downvote } = this.state;

		const render = Object.entries(details)
			.filter(([key, val]) => key === "Room")
			.map(([key, val]) => Object.keys(val))
			.forEach(key => {
				if (key.includes(roomId) && details.Room[roomId].status !== "equal") {
					details.Room[roomId].status
						? this.setState({ upvote: true, downvote: false })
						: this.setState({ upvote: false, downvote: true });
				}
			});
	}

	// toggle the upvote button when clicked
	onClickUpvote = () => {
		const { globalvote, upvote, downvote } = this.state;
		const { index } = this.props;

		// when the upvote button is selected twice, rendering it inactive
		if (upvote) {
			console.log("downvoted " + index);
			var status = "equal";
			var newVote = globalvote - 1;

			this.setState({
				globalvote: newVote,
				upvote: downvote,
				downvote: downvote
			});
		} else {
			console.log("upvoted " + index);
			var status = true;
			var newVote = globalvote + 1;

			this.setState({
				globalvote: newVote,
				downvote: upvote,
				upvote: !upvote
			});
		}
		this.props.editGlobalVote(index, newVote, status);
	};

	// toggle the downvote button when clicked
	onClickDownvote = () => {
		const { globalvote, downvote, upvote } = this.state;
		const { index } = this.props;

		// when the upvote button is selected twice, rendering it inactive
		if (downvote) {
			console.log("upvoted " + index);
			var status = "equal";
			var newVote = globalvote + 1;

			this.setState({
				globalvote: newVote,
				downvote: upvote,
				upvote: upvote
			});
		} else {
			console.log("downvoted " + index);
			var status = false;
			var newVote = globalvote - 1;

			this.setState({
				globalvote: newVote,
				upvote: downvote,
				downvote: !downvote
			});
		}
		this.props.editGlobalVote(index, newVote, status);
	};

	render() {
		const { upvote, downvote } = this.state;
		var upCSS = upvote
			? "col-md-4 btn btn-secondary"
			: "col-md-4 btn btn-outline-secondary";

		const downCSS = downvote
			? "col-md-4 btn btn-secondary"
			: "col-md-4 btn btn-outline-secondary";

		return (
			<div id="vote-item" className="row align-items-center">
				<button className={upCSS} type="button" onClick={this.onClickUpvote}>
					up
				</button>
				<span className="col-md-4 text-center">{this.state.globalvote}</span>
				<button
					className={downCSS}
					type="button"
					onClick={this.onClickDownvote}
				>
					down
				</button>
			</div>
		);
	}
}

export default ItemVote;
