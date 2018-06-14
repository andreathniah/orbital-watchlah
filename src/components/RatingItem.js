import React from "react";

class RatingItem extends React.Component {
  render() {
    const { Source, Value } = this.props.ratings;
    return (
      <div>
        <span>{Source}: </span><span>{Value}</span>
      </div>
    );
  }
}

export default RatingItem;
