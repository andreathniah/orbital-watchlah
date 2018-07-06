import React from "react";
import "./Loading.css";

class Loading extends React.Component {
	state = { number: 0 };

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState(prevState => ({ number: prevState.number + 1 }));
		}, 245);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="flex-container">
				<h1 className="box-progress" data-text="loading...">
					loading...
				</h1>
				<span className="box-text">{this.state.number}%</span>
			</div>
		);
	}
}

export default Loading;
