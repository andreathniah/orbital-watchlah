import React from "react";

class NicknameHeader extends React.Component {
	render() {
		return (
			<div className="header">
				<h1>
					<mark>welcome!</mark>
				</h1>
				<p>
					join <span>{this.props.roomId}</span> with a quirky nickname
				</p>
			</div>
		);
	}
}

export default NicknameHeader;
