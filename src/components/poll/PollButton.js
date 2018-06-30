import React from "react";
import { firebaseApp } from "../../base";

class PollButton extends React.Component {
	handleUpvote = () => {
		const { index } = this.props;
		this.props.upvoteMovie(index, this.props.status);
	};

	render() {
		const status = this.props.status ? " - " : " + ";
		return <button onClick={this.handleUpvote}>{status}</button>;
	}
}

export default PollButton;
