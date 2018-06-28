import React from "react";

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
				<button onClick={this.onClickRemove}>delete</button>
			</li>
		);
	}
}

export default SidebarItem;
