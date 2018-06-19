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
				if (key.includes(roomId)) {
					details.Room[roomId].status
						? this.setState({ upvote: true, downvote: false })
						: this.setState({ upvote: false, downvote: true });
				}
			});
	}

	increment = () => {
		const { globalvote, upvote } = this.state;
		const { index } = this.props;
		const newVote = globalvote + 1;
		this.setState({
			globalvote: newVote,
			downvote: upvote,
			upvote: !upvote
		});
		this.props.editGlobalVote(index, newVote, true);
		console.log("upvoted " + index);
	};

	decrement = () => {
		const { globalvote, downvote } = this.state;
		const { index } = this.props;
		const newVote = globalvote - 1;
		this.setState({
			globalvote: newVote,
			upvote: downvote,
			downvote: !downvote
		});
		this.props.editGlobalVote(index, newVote, false);
		console.log("downvoted " + index);
	};

	render() {
		return (
			<div>
				<button disabled={this.state.upvote} onClick={this.increment}>
					up
				</button>
				<span> {this.state.globalvote} </span>
				<button disabled={this.state.downvote} onClick={this.decrement}>
					down
				</button>
			</div>
		);
	}
}

export default ItemVote;
