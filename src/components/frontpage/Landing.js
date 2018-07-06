import React from "react";
import Loading from "./Loading";
import RoomPicker from "./RoomPicker";
import FetchJSON from "../fetch/FetchJSON";
import { firebaseApp } from "../../base";

class Landing extends React.Component {
	state = { loading: true };

	componentDidMount() {
		const dateObj = new Date();
		const todayDate =
			"" +
			dateObj.getUTCDate() +
			dateObj.getUTCMonth() +
			dateObj.getUTCFullYear();

		const database = firebaseApp.database().ref("moviebox");

		database.once("value", snapshot => {
			if (snapshot.exists()) {
				database.child(todayDate).once("value", snapshot => {
					if (snapshot.exists()) this.setState({ loading: false });
					else {
						this.timeout = setTimeout(() => {
							this.setState({ loading: false });
						}, 25000);
					}
				});
			} else {
				this.timeout = setTimeout(() => {
					this.setState({ loading: false });
				}, 25000);
			}
		});
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	render() {
		const { loading } = this.state;
		return (
			<div>
				{loading ? <Loading /> : <RoomPicker history={this.props.history} />}
				<FetchJSON
					initiateScrape={this.state.initiateScrape}
					initiateUpdate={this.state.initiateUpdate}
					initiateFlip={this.state.initiateFlip}
				/>
			</div>
		);
	}
}

export default Landing;
