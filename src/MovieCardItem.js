import React from "react";
import RatingItem from "./RatingItem";

class MovieCardItem extends React.Component {
  render() {
    const { Plot, Poster, Ratings, Released, Title } = this.props.details;

    // const ratingItem = Object.keys(Ratings).map(id => {
    //   if (Ratings[id] === null) console.log("null")
    //   console.log(Ratings[id])
    //   // return (
    //   //   <RatingItem key={this.props.index} rating={Ratings[id]}/>
    //   // );
    // })

    return (
      <div id="movie-card-item">
        <img src={Poster}/>
        <div>{Title}</div>
        <div>{Plot}</div>
        <div>{Released}</div>
        {/* {ratingItem} */}
      </div>
    );
  }
}

export default MovieCardItem;
