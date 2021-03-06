import React from "react";
import "./ItemVote.css";
import "./responsive.css";

class ItemVote extends React.Component {
	state = {
		globalvote: this.props.details.WatchVote,
		upvote: false,
		downvote: false
	};

	componentDidMount() {
		const { details, roomId } = this.props;
		// const { upvote, downvote } = this.state;

		Object.entries(details)
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
				downvote: false,
				upvote: false
			});
		} else if (downvote) {
			console.log("upvoted " + index);
			var status = "equal";
			var newVote = globalvote + 1;

			this.setState({
				globalvote: newVote,
				downvote: false,
				upvote: false
			});
		} else {
			console.log("upvoted " + index);
			var status = true;
			var newVote = globalvote + 1;

			this.setState({
				globalvote: newVote,
				downvote: false,
				upvote: true
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
				downvote: false,
				upvote: false
			});
		} else if (upvote) {
			console.log("downvoted " + index);
			var status = "equal";
			var newVote = globalvote - 1;

			this.setState({
				globalvote: newVote,
				downvote: false,
				upvote: false
			});
		} else {
			console.log("downvoted " + index);
			var status = false;
			var newVote = globalvote - 1;

			this.setState({
				globalvote: newVote,
				downvote: true,
				upvote: false
			});
		}
		this.props.editGlobalVote(index, newVote, status);
	};

	render() {
		const { upvote, downvote } = this.state;
		return (
			<div className="voteBar">
				<div className="middle">
					<button className="upCSS" type="button" onClick={this.onClickUpvote}>
						<i className="fas fa-caret-up fa-2x" />
					</button>
					<span className="votes">{this.state.globalvote}</span>
					<button
						className="downCSS"
						type="button"
						onClick={this.onClickDownvote}
					>
						<i className="fas fa-caret-down fa-2x" />
					</button>
				</div>
			</div>
		);
	}
}

export default ItemVote;
