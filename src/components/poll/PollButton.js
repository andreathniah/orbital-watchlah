import React from "react";
import "./PollButton.css";

class PollButton extends React.Component {
	handleUpvote = () => {
		const { index } = this.props;
		this.props.upvoteMovie(index, this.props.status);
	};

	render() {
		const status = this.props.status ? " - " : " + ";
		return <button onClick={this.handleUpvote} className="PollBtn">{status}</button>;
	}
}

export default PollButton;
