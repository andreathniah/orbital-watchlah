import React from "react";

class PollBar extends React.Component {
	handleDetails = () => {
		this.props.toggleDetails(this.props.details);
	};
	render() {
		return <span onClick={this.handleDetails}>{this.props.details.Title}</span>;
	}
}

export default PollBar;
