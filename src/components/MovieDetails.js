import React from "react";
import Sidebar from "./Sidebar";

class MovieDetails extends React.Component {
	render() {
		return (
			<div>
				<Sidebar match={this.props.match} />
				movie details
			</div>
		);
	}
}

export default MovieDetails;
