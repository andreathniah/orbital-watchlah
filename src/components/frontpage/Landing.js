import React from "react";
import Loading from "./Loading";
import RoomPicker from "./RoomPicker";
import FetchJSON from "../fetch/FetchJSON";

class Landing extends React.Component {
	state = { loading: true };

	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.setState({ loading: false });
		}, 25000);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	render() {
		const { loading } = this.state;
		return (
			<div>
				{loading ? <Loading /> : <RoomPicker history={this.props.history} />}
				<FetchJSON />
			</div>
		);
	}
}

export default Landing;
