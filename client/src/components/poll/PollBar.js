import React from "react";
import "./PollBar.css";

class PollBar extends React.Component {
	state = { progress: 0 };

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.progess !== nextProps.percentage) {
			return {
				progress: nextProps.percentage
			};
		}
	}

	handleDetails = () => {
		this.props.toggleDetails(this.props.moviebox);
	};

	render() {
		const percentage = this.state.progress + "%";
		const style = { width: percentage };

		return (
			<div className="movie" onClick={this.handleDetails}>
				<div className="progress" data-label={this.props.roombox.Title}>
					<span className="value" style={style} />
				</div>
			</div>
		);
	}
}

export default PollBar;
