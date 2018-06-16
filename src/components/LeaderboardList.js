import React from "react";
import PollStatus from "./PollStatus";
import ItemVote from "./ItemVote";

class LeaderboardList extends React.Component {

  addToPoll = index => {
    console.log("adding " + index );
    const item = {
      Title: this.props.details.Title,
      Votes: 0 // this vote is for customised poll later
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
        <ItemVote
          index={this.props.index}
          details={this.props.details}
          editGlobalVote={this.props.editGlobalVote}
        />
        <br/>
      </div>
    );
  }
}

export default LeaderboardList;
