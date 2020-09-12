import React from "react";
import { FTwitchData } from "../../types";

import { Theme } from "../../theme";
import styled from "styled-components";

import "./card.scss";
import { Link } from "react-router-dom";

type Props = {
  channel: FTwitchData.Channel;
  created_at: Date;
};

export const AnchorLink = styled.a`
  width: 100%;
  margin-top: 5px;
  background-color: ${Theme.lightShade};
  text-align: center;
 color: ${Theme.color};
 padding: 5px 5px;

 &:hover {
   color: inherit;
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
 }
`;

const Card = (props: Props) => {
  const { channel, created_at } = props;
  const date = new Date(created_at);
  return (
    <div
      className="card"
      style={{ color: Theme.color, backgroundColor: Theme.shadeColor }}
    >
      <img src={channel.logo} alt="yes" />
      <div className="info">
        <span className="display-name">{channel.display_name}</span>
        <span>Followed on: {date.toDateString()}</span>
        <MyLink to={`/${channel.name}`}>View Followers</MyLink>
        <AnchorLink
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit channel
        </AnchorLink>
      </div>
    </div>
  );
};

export default Card;
