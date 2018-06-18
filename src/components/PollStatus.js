import React from "react";
import base from "../base";
import { firebaseApp } from "../base";

class PollStatus extends React.Component {
	state = {
		roombox: [],
		status: false
	};

	componentDidMount() {
		const { index, roomId } = this.props;
		const database = firebaseApp.database().ref(`rooms/${roomId}/${index}`);
		database.on("value", snapshot => {
			if (snapshot.exists()) {
				this.setState({ status: true });
			}
		});
	}

	componentDidUpdate() {
		if (this.props.index === this.props.status && this.state.status) {
			this.setState({ status: !this.state.status });
		}
	}

	onClickAdd = () => {
		// if status is false, turn to true, else do nothihng
		const status = this.state.status ? false : true;
		if (status) {
			this.setState({ status: status });
			this.props.addToPoll(this.props.index);
		} else {
			this.setState({ status: status });
			this.props.removeFromBox(this.props.index);
		}
	};
	render() {
		const status = this.state.status ? " - " : " + ";
		return (
			<div>
				<button onClick={this.onClickAdd}>{status}</button>
			</div>
		);
	}
}

export default PollStatus;
