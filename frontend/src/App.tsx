import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_RECENT } from "./reducers/recent_reducer";

import Nav from "./components/Navbar/nav";
import Results from "./components/Results/results";
import Homepage from "./components/Homepage/homepage";

import "antd/dist/antd.css";
import "./App.scss";

export const mainColor = "#2e3d49",
  shadeColor = "#24303a";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const local = localStorage.getItem("recently");
    dispatch({ type: SET_RECENT, payload: local ? JSON.parse(local) : [] });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/:user" component={Results} />
          <Route path="/" component={Homepage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
