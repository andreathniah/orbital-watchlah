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

	// toggle button back to "+" when item is absent from database
	componentDidUpdate() {
		const { index, toggle } = this.props;
		const { status } = this.state;
		if (index === toggle && status) {
			this.setState({ status: !status });
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
			<div id="poll-item">
				<button
					className="btn btn-sm btn-outline-secondary"
					onClick={this.onClickAdd}
				>
					{status}
				</button>
			</div>
		);
	}
}

export default PollStatus;
