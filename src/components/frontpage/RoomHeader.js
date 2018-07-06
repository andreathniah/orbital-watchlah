import React from "react";

class RoomHeader extends React.Component {
	render() {
		return (
			<div className="header">
				<h1>
					<mark>room for one?</mark>
				</h1>
				<p>
					got a room id already, enter away!
					<br />
					new here, enter any creative quirky room id to start!
				</p>
			</div>
		);
	}
}

export default RoomHeader;
