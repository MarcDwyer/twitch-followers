import React from "react";

import { Theme } from "../../theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { a } from "react-spring";

import "./card.scss";
import { TwitchLookUp } from "../../twitch_types";
import { ErrorMsg } from "../../types";

export const AnchorLink = styled.a`
  width: 100%;
  margin-top: 5px;
  background-color: ${Theme.lightShade};
  text-align: center;
  color: ${Theme.color};
  padding: 5px 5px;

  &:hover {
    color: inherit;
    opacity: 0.65;
  }
`;

export const MyLink = styled(Link)`
  width: 100%;
  background-color: ${Theme.lightShade};
  text-align: center;
  color: ${Theme.color};
  padding: 5px 5px;
  margin-top: 10px;

  &:hover {
    color: inherit;
    opacity: 0.65;
  }
`;
type Props = {
  follow: TwitchLookUp.User | ErrorMsg;
  style: any | undefined;
};

const Card = ({ follow, style }: Props) => {
  return (
    <a.div
      className="card"
      style={{
        color: Theme.color,
        backgroundColor: Theme.shadeColor,
        ...style,
      }}
    >
      <div className="inner-card">
        {!("error" in follow) &&
          (() => {
            const date = new Date(follow.followed_at);
            return (
              <>
                <img src={follow.profile_image_url} alt="yes" />
                <div className="info">
                  <span className="display-name">{follow.display_name}</span>
                  <span>Followed on: {date.toDateString()}</span>
                  <MyLink to={`/${follow.login}`}>View Followers</MyLink>
                  <AnchorLink
                    href={`https://twitch.tv/${follow.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit channel
                  </AnchorLink>
                </div>
              </>
            );
          })()}
        {"error" in follow &&
          (() => {
            console.log(JSON.stringify(follow));
            return <span className="error-msg">{follow.error}</span>;
          })()}
      </div>
    </a.div>
  );
};

export default Card;
