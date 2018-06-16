import React from "react";
import base from "../base";
import LeaderboardList from "./LeaderboardList";

class Leaderboard extends React.Component {
  state = {
    globalbox: [],
    start: false,
    roombox: [],
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

  deleteStuff = globalbox => {
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

  addToBox = (item, index) => {
    const roombox = { ...this.state.roombox };
    roombox[index] = item;
    this.setState({ roombox: roombox })
  }

  removeFromBox = index => {
    console.log("removing " + index );
    const update = {};
    const roombox = { ...this.state.roombox };

    const render = Object
    .entries(roombox)
    .filter(([key, val]) => key !== index)
    .map(([key, val]) => [key, val])

    render.map(([key, val]) => {
      update[key] = val
    })
    this.setState({ roombox: update })
  }

  editGlobalVote = (index, value) => {
    const globalbox = { ...this.state.globalbox };
    globalbox[index] = {
      Title: globalbox[index].Title,
      UpdateStatus: globalbox[index].UpdateStatus,
      WatchVote: value
    }
    this.setState({ globalbox: globalbox })
  }

  render() {
    const { globalbox } = this.state;
    const leaderboardItem = Object.keys(globalbox).map(id => {
      return (
        <LeaderboardList
          key={id}
          index={id}
          details={globalbox[id]}
          addToBox={this.addToBox}
          removeFromBox={this.removeFromBox}
          editGlobalVote={this.editGlobalVote}
        />
      );
    })

    // console.log(this.props.match.params.roomId)
    return(
      <div>
        {this.state.start ? leaderboardItem : null}
      </div>

    );
  }
}

export default Leaderboard;
