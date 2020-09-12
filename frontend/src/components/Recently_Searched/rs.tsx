import React from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Theme } from "../../theme";
import "./rs.scss";

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
const topStreams: string[] = ["ninja", "xqcow", "pokimane"];

const RS = () => {
  const recent = useSelector(
    (store: ReduxStore.Store) => store.appData.recently
  );
  return (
    <div
      className="main-recently"
      style={{ backgroundColor: ` ${Theme.lightShade}` }}
    >
      <div className="innerdiv">
        <h2 style={{ color: Theme.color }}>
          {recent.length
            ? "Your recently searched"
            : "You haven't searched for a user yet maybe try..."}
        </h2>
        <div className="recents">
          {(() => {
            let result: string[] = topStreams;

            if (recent.length !== 0) result = recent.reverse();

            return result.map((k) => {
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
};

export default RS;
