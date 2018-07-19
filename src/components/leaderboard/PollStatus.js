import React from "react";
import { firebaseApp } from "../../base";
import './PollStatus.css';
import './responsive.css';

class PollStatus extends React.Component {
	state = {
		status: false // controls the text of the poll button (+/-)
	};

	componentDidMount() {
		const { index, roomId } = this.props;
		const database = firebaseApp.database().ref(`roombox/${roomId}/${index}`);
		database.on("value", snapshot => {
			if (snapshot.exists()) {
				// check if movie already exists in the specific user
				this.setState({ status: true });
			}
		});
	}

	// toggle button back to "+" when item is deleted from the sidebar
	componentDidUpdate() {
		const { index, roomId, toggle } = this.props;
		const { status } = this.state;
		const database = firebaseApp.database().ref(`roombox/${roomId}/${index}`);
		database.on("value", snapshot => {
			if (!snapshot.exists() && index === toggle && status) {
				// check if movie already exists in the specific user
				this.setState({ status: !status });
			}
		});
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
		const status = this.state.status ? <i class="fas fa-check"></i> : <i class="fas fa-plus"></i>;
		return (
			<div>
				<button onClick={this.onClickAdd} className="addBtn">{status}</button>
			</div>
		);
	}
}

export default PollStatus;
