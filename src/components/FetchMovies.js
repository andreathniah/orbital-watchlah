import React from "react";

class FetchMovies extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const str = this.props.name;
    const title = str.replace(/\s+/g, "+").toLowerCase();
    const APIKey = "d59b5d15";
    const year = 2018;
    const requestURL = "omdbapi.com/?t=" + title + "&y=" + year + "&plot=full&apikey=" + APIKey;

    fetch("https://cors-anywhere.herokuapp.com/" + requestURL)
      .then(results => {
        return results.json();
      })
      .then(data => {
        if (data.Response === "True") {
          this.props.addData(data);
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
