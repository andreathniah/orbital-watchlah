import React from "react";
import RatingItem from "./RatingItem";
import "./MovieCard.css";

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
			<div>
				<div className="cards">
					<img
						src={Poster}
						alt={this.props.index}
						onError={this.onImageError}
						className="posters2"
					/>
				</div>
				<div className="description">
					<div>{Released}</div>
					<div className="title">{Title}</div>
					<div>{Plot}</div>
					{ratingItem}
				</div>
			</div>
		);
	}
}

export default MovieCard;
