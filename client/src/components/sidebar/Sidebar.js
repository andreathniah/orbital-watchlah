import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";
import logo from "../../images/logo.jpg";

class Sidebar extends React.Component {
  render() {
    const { roombox, match, removeFromBox, toggle } = this.props;
    const { roomId } = match.params;

    const item = Object.keys(roombox).map(id => {
      return (
        <SidebarItem
          key={id}
          index={id}
          details={roombox[id]}
          removeFromBox={removeFromBox}
          toggle={toggle}
        />
      );
    });

    return (
      <div className="SideBar">
        <div>
          <img src={logo} className="logo" />
        </div>

        <div className="menu">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars" />
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample02">
            <ul className="navbar-nav mr-auto subMenu">
              <li className="nav-item">
                <Link to={`/${roomId}/leaderboard`}>LEADERBOARD</Link>
              </li>
              <li className="nav-item">
                <Link to={`/${roomId}/movies`}>MOVIE DETAILS</Link>
              </li>
              <li className="nav-item">
                <Link to={`/${roomId}/polls`}>POLLS</Link>
                {item}
              </li>
            </ul>
          </div>
        </div>

        <div className="SideBarContent">
          <Link to={`/${roomId}/leaderboard`}>LEADERBOARD</Link>
        </div>
        <div className="SideBarContent">
          <Link to={`/${roomId}/movies`}>MOVIE DETAILS</Link>
        </div>
        <div className="SideBarContent">
          <Link to={`/${roomId}/polls`}>POLLS</Link>
          {item}
        </div>
        <br />
      </div>
    );
  }
}

export default Sidebar;
