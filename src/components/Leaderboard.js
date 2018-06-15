import React from "react";
import base from "../base";
import LeaderboardList from "./LeaderboardList";

class Leaderboard extends React.Component {
  state = {
    globalbox: [],
    start: false
  };

  componentDidMount() {
    this.ref = base.syncState(`globalList/`, {
      context: this,
      state: "globalbox",
      then() {
        this.deleteStuff(this.state.globalbox);
        console.log("loading completed")
        this.setState({ start: true })
      }
    });
  }

  deleteStuff = (globalbox) => {
    Object
      .entries(globalbox)
      .filter(([key, val]) => !val.UpdateStatus)
      .map(([key, val]) => key)
      .forEach(key => {
        console.log("deleting " + key)
        globalbox[key] = null
      });
    this.setState({ globalbox: globalbox });
    this.forceUpdate();
  }

  render() {
    return(
      <div>
        {this.state.start ? <LeaderboardList details={this.state.globalbox}/> : null}
      </div>

    );
  }
}

export default Leaderboard;
