import React from "react";
import { render } from "react-dom";

import FetchJSON from "./FetchJSON";
import MovieCard from "./MovieCard"

import "./styles.css";

class App extends React.Component {
  state = {
    scrapeStatus: false
  }

  render() {
    return(
      <div>
        <FetchJSON />
        <MovieCard />
      </div>

    );
  }
}

render(<App/ >, document.getElementById("root"));
