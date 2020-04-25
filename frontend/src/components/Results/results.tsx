import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFollowers } from "../../hooks";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./results.scss";

const Results = () => {
  const { user } = useParams();
  const [followers, err] = useFollowers(user);
  const resRef = useRef<HTMLDivElement | null>(null);

  const didScroll = () => {
    const { current } = resRef;
    if (current) {
      const sheight = current?.scrollHeight,
        scrollTop = current?.scrollTop,
        height = current?.clientHeight;
      //  console.log({ sheight, scrollTop, height });
      const res = sheight - scrollTop === height;
      console.log(res);
      return res;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const { current } = resRef;
    current?.addEventListener("scroll", didScroll);
    return function () {
      if (current) current.removeEventListener("scroll", didScroll);
    };
  }, [resRef.current]);
  return (
    <div className="main-results" ref={resRef}>
      {user && !err && !followers && (
        <div className="center-loader">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      )}
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
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Results;
