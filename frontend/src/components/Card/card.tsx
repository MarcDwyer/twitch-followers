import React from "react";
import { FTwitchData } from "../../types";

import "./card.scss";
import { Theme } from "../../theme";

type Props = {
  channel: FTwitchData.Channel;
  created_at: Date;
};
const Card = (props: Props) => {
  const { channel, created_at } = props;
  const date = new Date(created_at);
  return (
    <a
      className="card"
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: Theme.color, backgroundColor: Theme.shadeColor }}
    >
      <img src={channel.logo} alt="yes" />
      <div className="info">
        <span className="display-name">{channel.display_name}</span>
        <span>Followed on: {date.toDateString()}</span>
      </div>
    </a>
  );
};

export default Card;
