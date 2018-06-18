import React from "react";
import base from "../base";
import { firebaseApp } from "../base";
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
    // need to forceUpdate PollStatus also
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
        />
      );
    });

      return(
        <div id="side-bar">
          <div>Link to popularity page</div>
          <div>Linnk to movie details</div>
          {item}
        </div>
      );
    }
  }
  export default Sidebar
