import React from "react";
import base from "./base";
import MovieCardItem from "./MovieCardItem";

class MovieCard extends React.Component {
  state = {
    databox: []
  };

  componentDidMount() {
    const dateObj = new Date();
    const todayDate = "" + dateObj.getUTCDate() + dateObj.getUTCMonth() + dateObj.getUTCFullYear();

    this.ref = base.syncState(`moviesJSON/${todayDate}`, {
      context: this,
      state: "databox"
    });
  }

  render() {
    const card = Object.keys(this.state.databox).map(id => {
      return (
        <MovieCardItem key={id} index={id} details={this.state.databox[id]}/>
      );
    })

    return (
      <div>{card}</div>
    );
  }
}


export default MovieCard;
