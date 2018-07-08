import React from "react";
import './RatingItem.css';

class RatingItem extends React.Component {
  render() {
    let { Source, Value } = this.props.ratings;

    if(Value.includes(".")) {
      Value = Value.substring(0, 1) + Value.substring(2, 3);
    }
    else {
      Value = Value.substring(0, 2);
    }  

    var StarsNumber = Math.floor(parseInt(Value) / 20);
    var Stars = "";

    var i;

    for(i = 0; i < StarsNumber; i++) {
      Stars += "★";
    }

    for(i = StarsNumber; i < 5; i++) {
      Stars += "☆";
    }

    Value = Value + "%"

    return (
      <div className="ratingBox">
			<span>{Source}: </span> 
		<span align="right">
			<span className="stars">{Stars} </span><span>{Value}</span>
		</span>	
      </div>
    );
  }
}

export default RatingItem;
