import React from "react";

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
		return (
			<div>
				<form onSubmit={this.goToPoll}>
					<h2>Enter your nickname</h2>
					<input
						type="text"
						ref={this.nicknameInput}
						required
						placeholder="Nickname"
					/>
					<button type="submit">Start Polling →</button>
				</form>
			</div>
		);
	}
}

export default NicknamePicker;
