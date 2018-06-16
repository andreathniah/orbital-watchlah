import React from "react";
import PollStatus from "./PollStatus";

class LeaderboardList extends React.Component {
  state = {
    votes: 0
  }

  addToPoll = index => {
    console.log("adding " + index );
    const item = {
      Title: this.props.details.Title,
      Votes: this.state.votes
    }
    this.props.addToBox(item, index);
  }

  render() {
    return(
      <div>
        {this.props.details.Title}
        <PollStatus
          index={this.props.index}
          addToPoll={this.addToPoll}
          removeFromBox={this.props.removeFromBox}
        />
        <br/>
      </div>
    );
  }
}

export default LeaderboardList;
