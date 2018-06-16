import React from "react";
import FetchTitles from "./FetchTitles";
import FetchTitlesBackup from "./FetchTitlesBackup";

import base from "../base";
import { firebaseApp } from "../base";

class FetchJSON extends React.Component {
  state = {
    initiateScrape: false,
    initiateUpdate: false,
    initiateFlip: false,
    databox: [],
    globalbox: []
  }

  componentDidMount() {
    const dateObj = new Date();
    const todayDate = "" + dateObj.getUTCDate() + dateObj.getUTCMonth() + dateObj.getUTCFullYear();
    // const todayDate = "1632018"

    const database = firebaseApp.database().ref("moviesJSON");

    database.once("value", (snapshot) => {
      if (snapshot.exists()) {
        database.child(todayDate).once("value", (snapshot) =>{
          if (snapshot.exists()) {
            console.log("retrieving data from database...");
            this.setState({ initiateFlip: true });
          }
          else {
            console.log("old data found, deleting and re-scraping...");
            database.remove();
            this.setState({
              initiateScrape: true,
              initiateUpdate: true
            });
          }
        })
      }
      else {
        console.log("scraping in progress...")
        this.setState({ initiateScrape: true });
      }
    })

    this.ref = base.syncState(`moviesJSON/${todayDate}`, {
      context: this,
      state: "databox"
    });

    this.ref = base.syncState(`globalList/`, {
      context: this,
      state: "globalbox"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addData = data => {
    const databox = { ...this.state.databox };
    databox[data.imdbID] = data;
    this.setState({
      databox: databox
    });
  }

  createGlobalList = data => {
    const globalbox = { ...this.state.globalbox };
    globalbox[data.imdbID] = {
      Title: data.Title,
      WatchVote: 0,
      UpdateStatus: false
    }
    this.setState({ globalbox: globalbox });
  }

  updateGlobalList = data => {
    const globalbox = { ...this.state.globalbox };

    if (globalbox.hasOwnProperty(data.imdbID)) {
      console.log("updating watch-votes...");
      const updatedVotes = globalbox[data.imdbID].WatchVote + 1;

      globalbox[data.imdbID] = {
        Title: data.Title,
        WatchVote: updatedVotes,
        UpdateStatus: true
      }
    }
    this.setState({ globalbox: globalbox });
  }

  render() {
    const { initiateScrape, initiateUpdate, initiateFlip } = this.state;
    return(
      <div>
        {(initiateScrape && initiateUpdate && initiateFlip===false) ? <FetchTitles
          id="FetchTitles"
          addData={this.addData}
          createGlobalList={this.updateGlobalList}
        /> : null }

        {(initiateScrape && initiateFlip===false) ? <FetchTitles
          id="FetchTitles"
          addData={this.addData}
          createGlobalList={this.createGlobalList}
        /> : null}

        {initiateFlip ? <FetchTitles
          id="FetchTitles"
          addData={this.addData}
          createGlobalList={this.updateGlobalList}
        /> : null}

      </div>
    );
  }

}

export default FetchJSON;
