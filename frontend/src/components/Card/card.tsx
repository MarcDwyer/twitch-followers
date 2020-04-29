import React from "react";
import { FTwitchData } from "../../types";

import { Theme } from "../../theme";
import { MyLink, AnchorLink } from "../../styled-components";

import "./card.scss";

type Props = {
  channel: FTwitchData.Channel;
  created_at: Date;
};

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
