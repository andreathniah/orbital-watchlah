import React from "react";
import RatingItem from "./RatingItem";

class MovieCardItem extends React.Component {
  render() {
    const { Plot, Poster, Ratings, Released, Title } = this.props.details;
    if (typeof Ratings !== "undefined") {
      var ratingItem = Object.keys(Ratings).map(id => {
        const uniqueId = "" + this.props.index + "-" + id;
        return (
          <RatingItem key={uniqueId} ratings={Ratings[id]}/>
        );
      });
    }

    return (
      <div id="movie-card-item">
        <img src={Poster}/>
        <div>{Title}</div>
        <div>{Plot}</div>
        <div>{Released}</div>
        {ratingItem}
      </div>
    );
  }
}

export default MovieCardItem;
