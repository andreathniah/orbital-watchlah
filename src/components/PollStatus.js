import React from "react";
import { firebaseApp } from "../base";

class PollStatus extends React.Component {
	state = {
		status: false
	};

	componentDidMount() {
		const { index, roomId } = this.props;
		const database = firebaseApp.database().ref(`rooms/${roomId}/${index}`);
		database.on("value", snapshot => {
			if (snapshot.exists()) {
				this.setState({ status: true });
				console.log("HELLOOOOOOOOO");
			}
		});
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
