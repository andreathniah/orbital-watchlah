import React from "react";
import { render } from "react-dom";

import FetchTitles from "./FetchTitles";
import FetchMovies from "./FetchMovies"

import "./styles.css";

class App extends React.Component {

  render() {
    return(
      <div>
        <FetchTitles
        />
      </div>

    );
  }
}

render(<App/ >, document.getElementById("root"));
