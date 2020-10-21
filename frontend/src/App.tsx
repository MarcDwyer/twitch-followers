import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Theme } from "./theme";

import TData from "./stores/tdata";

import Nav from "./components/Navbar/nav";
import Results from "./components/Results/results";
import RecentlySearch from "./components/Recently_Searched/rs";

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
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Container>
            <Route path="/:user" render={() => <Results tData={tData} />} />
            <Route exact path="/" component={RecentlySearch} />
          </Container>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
