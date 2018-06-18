import React from "react";

class SidebarItem extends React.Component {
  onClickRemove = () => {
    const { index } = this.props;
    this.props.removeFromList(index);
  }

  render() {
    return (
      <li>
        {this.props.details.Title}
        <button onClick={this.onClickRemove}>
          delete
        </button>
      </li>
    );
  }
}

export default SidebarItem;
