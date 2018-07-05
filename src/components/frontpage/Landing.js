import React from "react";
import Loading from "./Loading";
import RoomPicker from "./RoomPicker";

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
		if (loading) return <Loading />;
		return <RoomPicker history={this.props.history} />;
	}
}

export default Landing;
