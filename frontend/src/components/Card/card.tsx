import React from "react";
import { FTwitchData } from "../../types";

import { Theme } from "../../theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

import "./card.scss";
import { TwitchFollowers } from "../../twitch_types";

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

  &:hover {
    color: inherit;
    opacity: 0.65;
  }
`;
type Props = {
  daum: TwitchFollowers.Daum;
};
// https://static-cdn.jtvnw.net/jtv_user_pictures/7e560345-d4e9-47d6-8020-15108bfddcaa-profile_image-300x300.png

const Card = ({ daum }: Props) => {
  const date = new Date(daum.followed_at);

  const logo = `https://static-cdn.jtvnw.net/jtv_user_pictures/${daum.to_name}-profile_image-300x300.png`;
  console.log(logo);
  return (
    <div
      className="card"
      style={{
        color: Theme.color,
        backgroundColor: Theme.shadeColor,
      }}
    >
      {daum.to_name}
      <img src={logo} alt="yes" />
      <div className="info">
        {/* <span className="display-name">{channel.display_name}</span>
        <span>Followed on: {date.toDateString()}</span>
        <MyLink to={`/${channel.name}`}>View Followers</MyLink>
        <AnchorLink
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit channel
        </AnchorLink> */}
      </div>
    </div>
  );
};

export default Card;
