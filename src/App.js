import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <p>Lights Out!</p>
        <h3>Goal: Make all the tiles black.</h3>
        <Board nrows="4" ncols="4" chanceLightStartsOn="0.4"/>
      </div>
  );
}

export default App;
