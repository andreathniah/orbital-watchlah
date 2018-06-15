import React from "react";
import FetchMovies from "./FetchMovies"

class FetchTitles extends React.Component {
  state = {
    titles: []
  };

  componentDidMount() {
    this.fetchTitles();
  }

  fetchTitles = () => {
    fetch("https://cors-anywhere.herokuapp.com/incinemas.sg/showtimes.aspx")
      .then(results => {
        return results.text();
      })
      .then(data => {
        console.log("Fetching movie titles...")
        const parser = new DOMParser();
        const httpDoc = parser.parseFromString(data, "text/html");
        const movieDDL = httpDoc.getElementById("ddlMovie");
        const movieTitles = [];
        for (var i = 1; i < movieDDL.length; i++) {
          movieTitles.push(movieDDL[i].innerHTML);
        }
        return movieTitles;
      })
      .then(movieTitles => {
        this.setState({
          titles: movieTitles
        });
        console.log("Scraping completed.")
      })
      .catch(error => console.log("Scraping failed due to ", error));
  }

  render() {
    var titleItem = this.state.titles.map(name =>{
      return (
        <FetchMovies
          key={name}
          name={name}
          addData={this.props.addData}
          createGlobalList={this.props.createGlobalList}
        />
      );
    })


    return(
      <div>{titleItem}</div>
    );
  }
}

export default FetchTitles;
