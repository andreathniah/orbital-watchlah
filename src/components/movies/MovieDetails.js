import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MovieMain from "./MovieMain";

class MovieDetails extends React.Component {
	render() {
		return (
			<div>
				<Sidebar match={this.props.match} />
				<MovieMain />
			</div>
		);
	}
}

export default MovieDetails;
