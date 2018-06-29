import React from "react";
import { firebaseApp } from "../../base";

class PollButton extends React.Component {
	state = {
		status: this.props.status
	};

	handleUpvote = () => {
		const { index } = this.props;

		this.setState(
			prevState => ({ status: !prevState.status }),
			() => {
				this.props.upvoteMovie(index, this.state.status);
			}
		);
	};

	render() {
		const status = this.props.status ? " - " : " + ";
		return <button onClick={this.handleUpvote}>{status}</button>;
	}
}

export default PollButton;