import React from "react";
import { getFunName } from "../helpers";
import FetchJSON from "./FetchJSON";

class RoomPicker extends React.Component {
	roomInput = React.createRef();

	goToRoom = event => {
		event.preventDefault();
		const roomName = this.roomInput.current.value;
		console.log(roomName);
		this.props.history.push(`/room/${roomName}`);
	};

	render() {
		return (
			<div>
				<FetchJSON />
				<form onSubmit={this.goToRoom}>
					<h2>Please enter a Room ID</h2>
					<input
						type="text"
						ref={this.roomInput}
						required
						placeholder="Room ID"
						defaultValue={getFunName()}
					/>
					<button type="submit">Visit Room →</button>
				</form>
			</div>
		);
	}
}

export default RoomPicker;
