import React from "react";

class OMDApi extends React.Component {
  state = {
    showComponent: false,
    data: []
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const str = this.props.name;
    const title = str.replace(/\s+/g, "+").toLowerCase();
    const APIKey = "d59b5d15";
    const year = 2018;
    const requestURL = "omdbapi.com/?t=" + str + "&y=" + year + "&plot=full&apikey=" + APIKey;

    fetch("https://cors-anywhere.herokuapp.com/" + requestURL)
      .then(results => {
        return results.json();
      })
      .then(data => {
        if (data.Response === "True") {
          this.props.addData(data);
          this.setState({
            data: data,
            showComponent: true
          });
        }
      })
      .catch(error => console.log("parsing failed ", error));
  }

  render() {
    return(
      <div>
        {this.state.showComponent ? console.log("retrieving " + this.state.data.Title) : null}
      </div>

    );
  }
}

export default OMDApi;
