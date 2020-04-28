import React from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";

import { RecentLink } from "../../styled-components"

import { Theme } from "../../theme";
import "./rs.scss";

const RS = () => {
  const recent = useSelector((store: ReduxStore.Store) => store.appData.recently);
  return (
    <div className="main-recently">
      <h2 style={{ color: Theme.color }}>Recently searched</h2>
      <div className="recents">
        {recent &&
          recent.map((k) => {
            return (
              <RecentLink key={k} to={`/${k}`} >
              <span>
                {k}
              </span>
              </RecentLink>
            );
          })}
      </div>
    </div>
  );
};

export default RS;
