import React from "react";
import base from "../base";
import { Switch, Route } from "react-router-dom";

import LeaderboardList from "./LeaderboardList";
import MovieCard from "./MovieCard";
import Sidebar from "./Sidebar";

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

    this.ref = base.syncState(`rooms/${this.props.match.params.roomId}`, {
      context: this,
      state: "roombox"
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
    // this.forceUpdate();
  }

  addToBox = (item, index) => {
    const roombox = { ...this.state.roombox };
    roombox[index] = item;
    this.setState({ roombox: roombox })
  }

  removeFromBox = index => {
    console.log("removing " + index );
    const roombox = { ...this.state.roombox };

    Object
    .entries(roombox)
    .filter(([key, val]) => key === index)
    .map(([key, val]) => key)
    .forEach(key => {
      console.log("deleting " + key)
      roombox[key] = null
    });
    this.setState({ roombox: roombox });
    // this.forceUpdate();
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
    const { path } = this.props.match;
    const { globalbox, roombox } = this.state;

    const leaderboardItem = Object.keys(globalbox).map(id => {
      return (
        <LeaderboardList
          key={id}
          index={id}
          details={globalbox[id]}
          roomId={this.props.match.params.roomId}
          addToBox={this.addToBox}
          removeFromBox={this.removeFromBox}
          editGlobalVote={this.editGlobalVote}
        />
      );
    })

    return(
      <div>
        <Switch>
          <Route path={`${path}/movies`} component={MovieCard} />
        </Switch>
        <Sidebar roomId={this.props.match.params.roomId}/>
        <div id="main">
          {this.state.start ? leaderboardItem : null}
        </div>
      </div>

    );
  }
}

export default Leaderboard;
