import React from "react";

class LeaderboardList extends React.Component {
  render() {
    // display poster, imdbId, vote card, pollStatus

    return(
      <div>
        LeaderboardList
        {this.props.details.Title}
      </div>
    );
  }
}

export default LeaderboardList;
