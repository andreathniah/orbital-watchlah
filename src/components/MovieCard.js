import React from "react";
import RatingItem from "./RatingItem";

class MovieCard extends React.Component {
	render() {
		const { Plot, Poster, Ratings, Released, Title } = this.props.details;
		if (typeof Ratings !== "undefined") {
			var ratingItem = Object.keys(Ratings).map(id => {
				const uniqueId = "" + this.props.index + "-" + id;
				return <RatingItem key={uniqueId} ratings={Ratings[id]} />;
			});
		}

		return (
			<div>
				<img src={Poster} alt={this.props.index} />
				<div>{Released}</div>
				<div>{Title}</div>
				<div>{Plot}</div>
				{ratingItem}
			</div>
		);
	}
}

export default MovieCard;
