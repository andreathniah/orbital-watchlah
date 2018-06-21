import React from "react";
import base from "../base";
import { firebaseApp } from "../base";

class PollStatus extends React.Component {
	state = {
		roombox: [], // contains user specific information
		status: false // controls the text of the poll button (+/-)
	};

	componentDidMount() {
		const { index, roomId } = this.props;
		const database = firebaseApp.database().ref(`rooms/${roomId}/${index}`);
		database.on("value", snapshot => {
			if (snapshot.exists()) {
				// check if movie already exists in the specific user
				this.setState({ status: true });
			}
		});
	}

	// toggle button back to "+" when item is deleted from the sidebar
	// bug alert: doesn't work when you redo the add-then-delete process 2nd time onwards
	componentDidUpdate() {
		const { index, toggle } = this.props;
		const { status } = this.state;
		if (index === toggle && status) {
			this.setState({ status: !status });
		}
	}

	// add movie to user's customised poll while toggling the status of the button
	onClickAdd = () => {
		// if status is false, turn to true, else do nothing
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
		// console.log(this.state.status + " " + status);
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
