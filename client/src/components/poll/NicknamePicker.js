import React from "react";
import NicknameHeader from "./NicknameHeader";

class NicknamePicker extends React.Component {
	nicknameInput = React.createRef();

	goToPoll = event => {
		event.preventDefault();
		const nickname = this.nicknameInput.current.value;
		const { roomId } = this.props.match.params;
		this.props.history.push(`/${roomId}/${nickname}`);
		console.log(nickname);
	};

	render() {
		const { roomId } = this.props.match.params;

		return (
			<div className="flex-container form">
				<form onSubmit={this.goToPoll}>
					<NicknameHeader roomId={roomId} />
					<input
						type="text"
						ref={this.nicknameInput}
						required
						placeholder="Enter a Nickname"
					/>
					<button type="submit" className="button">
						Go
					</button>
				</form>
			</div>
		);
	}
}

export default NicknamePicker;
