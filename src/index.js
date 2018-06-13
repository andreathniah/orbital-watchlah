import React from "react";
import { render } from "react-dom";

import FetchJSON from "./FetchJSON";

import "./styles.css";

class App extends React.Component {

  render() {
    return(
      <div>
        <FetchJSON
        />
      </div>

    );
  }
}

render(<App/ >, document.getElementById("root"));
