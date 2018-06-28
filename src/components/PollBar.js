import React from "react";

class PollBar extends React.Component {
	handleDetails = () => {
		this.props.toggleDetails(this.props.details);
	};
	render() {
		return (
			<div>
				<div className="progress">
					<div
						className="progress-bar"
						role="progressbar"
						aria-valuenow="25"
						aria-valuemin="0"
						aria-valuemax="100"
					>
						<span onClick={this.handleDetails}>{this.props.details.Title}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default PollBar;
