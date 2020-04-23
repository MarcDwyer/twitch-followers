import React from "react";

import Search from "./components/Search/search";

import "antd/dist/antd.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="inner-div">
        <Search />
      </div>
    </div>
  );
}

export default App;
