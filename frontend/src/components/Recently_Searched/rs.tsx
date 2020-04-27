import React from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";

import { Link } from "react-router-dom";
import { Theme } from "../../theme";
import "./rs.scss";

const RS = () => {
  const recent = useSelector((store: ReduxStore.Store) => store.recently);
  return (
    <div className="main-recently">
      <h2 style={{ color: Theme.color }}>Recently searched</h2>
      <div className="recents">
        {recent &&
          recent.map((k) => {
            return (
              <Link key={k} to={`/${k}`}>
                {k}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default RS;
