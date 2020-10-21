import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Theme } from "./theme";

import TData from "./stores/tdata";
import RecentStore from "./stores/recently";

import Nav from "./components/Navbar/nav";
import Results from "./components/Results/results";
import RecentSearches from "./components/Recently_Searched/recents";

import "antd/dist/antd.css";
import "./App.scss";
import styled from "styled-components";

export const mainColor = "#2e3d49",
  shadeColor = "#24303a";

const Container = styled.div`
  background-color: ${Theme.backgroundColor};
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
`;
function App() {
  const tData = new TData();
  const rs = new RecentStore();
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Container>
            <Route path="/:user" render={() => <Results tData={tData} />} />
            <Route exact path="/" render={() => <RecentSearches rs={rs} />} />
          </Container>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
