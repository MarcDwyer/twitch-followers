import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import RecentlySearched from "../../stores/recently";

import { Theme } from "../../theme";
import "./recents.scss";

export const RecentLink = styled(Link)`
  display: flex;
  margin: 5px 0 5px 0;
  margin-right: 7.5px;
  margin-bottom: 7.5px;
  border: 1px solid ${Theme.color};
  border-radius: 10px;

  span {
    padding: 8.5px 8.5px;
    color: ${Theme.color};
  }

  &:hover {
    opacity: 0.75;
  }
`;

type Props = {
  rs: RecentlySearched;
};
const RecentSearches = observer(({ rs }: Props) => {
  const recents = Object.keys(rs.recents);
  useEffect(() => {
    rs.fetchRecents();
  }, []);

  return (
    <div
      className="main-recently"
      style={{ backgroundColor: ` ${Theme.lightShade}` }}
    >
      <div className="innerdiv">
        <h2 style={{ color: Theme.color }}>
          {!rs.isMock
            ? "Your recently searched"
            : "You haven't searched for a user yet maybe try..."}
        </h2>
        <div className="recents">
          {(() => {
            return recents.map((k) => {
              return (
                <RecentLink key={k} to={`/${k}`}>
                  <span>{k}</span>
                </RecentLink>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
});

export default RecentSearches;
