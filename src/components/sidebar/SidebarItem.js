import React from "react";
import "./SidebarItem.css";

class SidebarItem extends React.Component {
	// remove title from roombox database onclick
	onClickRemove = () => {
		const { index } = this.props;
		this.props.removeFromBox(index);
		this.props.toggle(index);
	};

	render() {
		return (
			<li>
				{this.props.details.Title}
				<button onClick={this.onClickRemove} className="minus"><i class="fas fa-minus"></i></button>
			</li>
		);
	}
}

export default SidebarItem;
