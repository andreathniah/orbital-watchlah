import React from "react";
import { omdKey } from "../secret";
import { proxyURL } from "../secret";

class FetchMovies extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const str = this.props.name;
    const title = str.replace(/\s+/g, "+").toLowerCase();
    const APIKey = omdKey;
    const year = 2018;
    const requestedURL = "omdbapi.com/?t=" + title + "&y=" + year + "&plot=full&apikey=" + APIKey;

    fetch(proxyURL + requestedURL)
      .then(results => {
        return results.json();
      })
      .then(data => {
        if (data.Response === "True") {
          this.props.addData(data);
          this.props.createGlobalList(data);
        }
      })
      .catch(error => console.log("parsing failed ", error));
  }

  render() {
    return(
      <div>
        {null}
      </div>

    );
  }
}

export default FetchMovies;
