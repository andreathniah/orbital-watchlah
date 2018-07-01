import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import './Sidebar.css';
import logo from '../../images/logo.jpg';

class Sidebar extends React.Component {
	render() {
		const { roombox, match, removeFromBox, toggle } = this.props;
		const { roomId } = match.params;

		const item = Object.keys(roombox).map(id => {
			return (
				<SidebarItem
					id="sidebar-item"
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
				<div className="logo">
					<img src={logo} width="150" height="150" />
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
