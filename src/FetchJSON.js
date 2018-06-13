import React from "react";
import FetchTitles from "./FetchTitles";
import base from "./base";
import { firebaseApp } from "./base";


class FetchJSON extends React.Component {
  state = {
    showComponent: false,
    databox: []
  }

  componentDidMount() {
    const dateObj = new Date();
    const todayDate = "" + dateObj.getUTCDate() + dateObj.getUTCMonth() + dateObj.getUTCFullYear();

    firebaseApp.database().ref("movieDetails").child(todayDate).once("value", function(snapshot) {
      if(!snapshot.exists()){
        this.ref = base.syncState(`movieDetails/${todayDate}/databox`, {
          context: this,
          state: "databox"
        });
      }
    })


  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addData = data =>{
    // copy the state item
    const databox = { ...this.state.databox };
    // create new item to existing items
    databox[`data-${Date.now()}`] = data;
    // update state of items
    this.setState({
      databox: databox,
      showComponent: true
      });
  }

  render() {
    // this.state.showComponent ? console.log(this.state.databox) : null

    return(
      <div>
        <FetchTitles
          addData={this.addData}
        />
      </div>
    );
  }

}

export default FetchJSON;
