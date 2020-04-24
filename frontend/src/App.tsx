import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Search from "./components/Search/search";
import Nav from "./components/Navbar/nav";
import Results from "./components/Results/results";

import "antd/dist/antd.css";
import "./App.scss";

export const mainColor = "#2e3d49",
  shadeColor = "#24303a";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/:user" component={Results} />
          <Route path="/" component={Search} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
