import React from "react";

class ItemVote extends React.Component {
	state = {
		globalvote: this.props.details.WatchVote
	};

	increment = () => {
		const { globalvote } = this.state;
		const { index } = this.props;
		const newVote = globalvote + 1;
		this.setState({ globalvote: newVote });
		this.props.editGlobalVote(index, newVote);
		console.log("upvoted " + index);
	};

	decrement = () => {
		const { globalvote } = this.state;
		const { index } = this.props;
		const newVote = globalvote - 1;
		this.setState({ globalvote: newVote });
		this.props.editGlobalVote(index, newVote);
		console.log("downvoted " + index);
	};

	render() {
		return (
			<div>
				<button onClick={this.increment}>up</button>
				<span> {this.state.globalvote} </span>
				<button onClick={this.decrement}>down</button>
			</div>
		);
	}
}

export default ItemVote;
