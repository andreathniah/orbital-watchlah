import React from "react";
import { getFunName } from "../../helpers.js";
import RoomHeader from "./RoomHeader";
import "./Loading.css";

class RoomPicker extends React.Component {
	roomInput = React.createRef();

	goToRoom = event => {
		event.preventDefault();
		const roomName = this.roomInput.current.value;
		console.log(roomName);
		this.props.history.push(`/${roomName}/leaderboard`);
	};

	render() {
		return (
			<div className="flex-container form">
				<form>
					<RoomHeader />
					<input
						type="text"
						ref={this.roomInput}
						required
						placeholder="Room ID"
						defaultValue={getFunName()}
					/>
					<button type="submit" className="button">
						Go
					</button>
				</form>
			</div>
		);
	}
}

export default RoomPicker;
