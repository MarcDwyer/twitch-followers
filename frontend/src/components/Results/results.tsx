import React from "react";
import { useParams } from "react-router-dom";
import { useFollowers } from "../../hooks";

import "./results.scss";

const Results = () => {
  const { user } = useParams();
  const [followers, err] = useFollowers(user);
  return (
    <div className="main-results">
      {!err && followers && (
        <React.Fragment>
          <h1>
            {user} follows {followers._total} streams
          </h1>
          <div className="inner-results">
            {followers.follows.map(({ channel, created_at }) => {
              const date = new Date(created_at);
              return (
                <a
                  className="card"
                  key={channel._id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={channel.logo} alt="yes" />
                  <div className="info">
                    <span className="display-name">{channel.display_name}</span>
                    <span>Followed on: {date.toDateString()}</span>
                  </div>
                </a>
              );
            })}
            ;
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Results;
