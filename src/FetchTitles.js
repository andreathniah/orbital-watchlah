<<<<<<< HEAD
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
    fetch("https://cors-anywhere.herokuapp.com/insing.com/movies/now-showing/")
      .then(results => {
        return results.text();
      })
      .then(data => {
        console.log("Fetching movie titles")
        const parser = new DOMParser();
        const httpDoc = parser.parseFromString(data, "text/html");
        const movieDDL = httpDoc.getElementsByClassName("movie-id")[1].getElementsByTagName("li");
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
        console.log("Titles added to state")
      })
      .catch(error => console.log("parsing failed ", error));
  }

  render() {
    var titleItem = this.state.titles.map(name =>{
      return (
        <FetchMovies
          key={name}
          name={name}
          addData={this.props.addData}
        />
       // <div>{name}</div>
      );
    })

    // this.state.showComponent ? console.log(JSON.stringify(this.state.props.databox)) : null

    return(
      <div>
       {titleItem}
      </div>
    );
  }
}

export default FetchTitles;
=======
import React from "react";
import FetchMovies from "./FetchMovies"

class FetchTitles extends React.Component {
  state = {
    titles: [],
    databox: []
  };

  componentDidMount() {
    this.fetchTitles();
  }

  fetchTitles = () => {
    fetch("https://cors-anywhere.herokuapp.com/insing.com/movies/now-showing/")
      .then(results => {
        return results.text();
      })
      .then(data => {
        console.log("Fetching movie titles")
        const parser = new DOMParser();
        const httpDoc = parser.parseFromString(data, "text/html");
        const movieDDL = httpDoc.getElementsByClassName("movie-id")[1].getElementsByTagName("li");
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
        console.log("Titles added to state")
      })
      .catch(error => console.log("parsing failed ", error));
  }

  addData = data =>{
    // copy the state item
    const databox = { ...this.state.databox };
    // create new item to existing items
    databox[`data-${Date.now()}`] = data;
    // update state of items
    this.setState({ databox: databox });
  }


  render() {
    var titleItem = this.state.titles.map(name =>{
      return (
        <FetchMovies 
          key={name}
          name={name}
          addData={this.addData}
        />
      //  <div>{name}</div>
      );
    })
        return(
      <div>
       {titleItem}
      </div>
    );
  }
}

export default FetchTitles;
>>>>>>> 6cdd2be69dfb1f58ea4068cdf5a5c3e7760cf202
