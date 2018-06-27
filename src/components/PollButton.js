import React from "react";
import { firebaseApp } from "../base";

class PollButton extends React.Component {
	state = {
		status: false
	};

	componentDidMount() {
		const { roomId, user, index } = this.props;
		const database = firebaseApp
			.database()
			.ref(`memberbox/${roomId}/${user}/${index}`);
		database.on("value", snapshot => {
			if (snapshot.exists()) {
				// check if movie already exists in the specific user
				this.setState({ status: true });
			}
		});
	}

	handleUpvote = () => {
		const { index } = this.props;
		const status = this.state.status ? false : true;

		this.setState(prevState => ({ status: status }));
		this.props.upvoteMovie(index, status);
	};
	render() {
		const status = this.state.status ? " - " : " + ";
		return <button onClick={this.handleUpvote}>{status}</button>;
	}
}

export default PollButton;
