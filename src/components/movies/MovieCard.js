import React from "react";
import RatingItem from "./RatingItem";

class MovieCard extends React.Component {
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
			<div className="container-fluid row">
				<div className="col-md-3">
					<img
						className="resize-image"
						src={Poster}
						alt={this.props.index}
						onError={this.onImageError}
					/>
				</div>
				<div className="col-md-9">
					<div>{Released}</div>
					<div>{Title}</div>
					<div>{Plot}</div>
					{ratingItem}
				</div>
			</div>
		);
	}
}

export default MovieCard;
