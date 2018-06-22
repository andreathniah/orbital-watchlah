import React from "react";
import RatingItem from "./RatingItem";

class MovieCardItem extends React.Component {
	onImageError = event => {
		event.target.src = "/images/default-poster.png";
	};

	render() {
		const { Plot, Poster, Ratings, Released, Title } = this.props.details;
		if (typeof Ratings !== "undefined") {
			var ratingItem = Object.keys(Ratings).map(id => {
				const uniqueId = "" + this.props.index + "-" + id;
				return <RatingItem key={uniqueId} ratings={Ratings[id]} />;
			});
		}

		return (
			<div id="movie-card-item" className="container-fluid">
				<img src={Poster} alt={this.props.index} onError={this.onImageError} />
				<div>{Title}</div>
				<div>{Plot}</div>
				<div>{Released}</div>
				{ratingItem}
			</div>
		);
	}
}

export default MovieCardItem;
