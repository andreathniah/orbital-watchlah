import React from "react";
import FetchTitles from "./FetchTitles";
import base from "./base";
import { firebaseApp } from "./base";


class FetchJSON extends React.Component {
  state = {
    initiateScrape: false,
    databox: []
  }

  componentDidMount() {
    const dateObj = new Date();
    const todayDate = "" + dateObj.getUTCDate() + dateObj.getUTCMonth() + dateObj.getUTCFullYear();

    const database = firebaseApp.database().ref("moviesJSON");

    database.once("value", (snapshot) => {
      if (snapshot.exists()) {
        database.child(todayDate).once("value", (snapshot) =>{
          if (snapshot.exists()) console.log("retrieving data from database...")
          else {
            console.log("old data found, deleting and re-scraping...");
            database.remove();
            this.setState({ initiateScrape: true });
          }
        })
      }
      else this.setState({ initiateScrape: true });
    })

    this.ref = base.syncState(`moviesJSON/${todayDate}`, {
      context: this,
      state: "databox"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addData = data =>{
    // copy the state item
    const databox = { ...this.state.databox };
    // create new item to existing items
    databox[data.imdbID] = data;
    // update state of items
    this.setState({
      databox: databox,
      initiateScrape: true
      });
  }

  render() {
    return(
      <div>
        {this.state.initiateScrape ? <FetchTitles id="FetchTitles" addData={this.addData} /> : null}
      </div>
    );
  }

}

export default FetchJSON;
