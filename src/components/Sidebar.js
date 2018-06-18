import React from "react";
import { Switch, Route } from "react-router-dom";
import base from "../base";
import MovieCard from "./MovieCard";
import SidebarItem from "./SidebarItem";

class Sidebar extends React.Component {
  state = {
    roombox: []
  };

  componentDidMount() {
    const { roomId } = this.props;
    this.ref = base.syncState(`rooms/${roomId}`, {
      context: this,
      state: "roombox"
    });
  }

  removeFromList = index => {
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
    this.forceUpdate();
  }

  render() {
    const { roombox } = this.state;
    const item = Object.keys(roombox).map(id => {
      return (
        <SidebarItem
          key={id}
          index={id}
          details={roombox[id]}
          removeFromList={this.removeFromList}
          refresh={this.props.refresh}
        />
      );
    });

      return(
        <div id="side-bar">
          <Switch>
            <Route path={`${this.props.roomId}/movies`} component={MovieCard} />
          </Switch>
          <div>Link to popularity page</div>
          <div>Link to movie details</div>
          {item}
          <br/>

        </div>
      );
    }
  }
  export default Sidebar
