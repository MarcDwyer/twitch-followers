import React, { useRef, useEffect, useReducer, Reducer } from "react";
import { useParams, RouteComponentProps } from "react-router-dom";
import Loader from "react-loader-spinner";
import { fetchUser } from "../../util";
import { useDebouncedCallback } from "use-debounce";

import ResultsReducer, {
  ResultsState,
  Action,
  MERGE_FOLLOWERS,
  INIT_FOLLOWERS,
  CHANGE_OFFSET,
  ERROR_MSG,
} from "./results_reducer";

import { FTwitchData, ErrorMsg } from "../../types";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./results.scss";

export const initState = {
  followers: null,
  error: null,
  offset: 0,
};

const Results = () => {
  const { user } = useParams();
  const [{ offset, followers, error }, dispatch] = useReducer<
    Reducer<ResultsState, Action>
  >(ResultsReducer, initState);

  const resRef = useRef<HTMLDivElement | null>(null);
  const prevOffset = useRef<number>(0);
  const listenerCount = useRef<number>(0);

  const didScroll = () => {
    const { current } = resRef;
    if (current) {
      const sheight = current.scrollHeight,
        scrollTop = current.scrollTop,
        height = current.clientHeight;
      //  console.log({ sheight, scrollTop, height });
      const res = sheight - scrollTop === height;
      return res;
    } else {
      return false;
    }
  };
  //Checks to see if you're fully scrolled down, if you are fetch paginated data
  const [paginate] = useDebouncedCallback(() => {
    const isBottom = didScroll();
    if (isBottom && followers) {
      let newOffset = offset + 35;
      if (newOffset <= followers._total) {
        console.log(newOffset, followers._total);
        dispatch({ type: CHANGE_OFFSET, payload: newOffset });
      }
    }
  }, 250);
  // Server can always send back an Error, this is meant to handle that error.
  // Second parameter is what you intend to do if the payload does not have an error
  const handlePayload = (
    payload: FTwitchData.RootChannel | ErrorMsg,
    symbol: Symbol
  ) => {
    if ("error" in payload) {
      dispatch({
        type: ERROR_MSG,
        payload,
      });
    } else {
      dispatch({
        type: symbol,
        payload,
      });
    }
  };
  useEffect(() => {
    const { current } = resRef;
    if (current && !listenerCount.current) {
      current.addEventListener("scroll", paginate);
      listenerCount.current++;
    }
    return function () {
      if (current) current.removeEventListener("scroll", paginate);
    };
  }, []);
  useEffect(() => {
    if (!user) return;
    fetchUser(user, 0).then((payload) => {
      handlePayload(payload, INIT_FOLLOWERS);
    });
    prevOffset.current = 0;
  }, [user]);

  useEffect(() => {
    if (!user || prevOffset.current === offset) return;
    fetchUser(user, offset).then((payload) => {
      handlePayload(payload, MERGE_FOLLOWERS);
    });
    prevOffset.current = offset;
  }, [offset]);
  return (
    <div className="main-results" ref={resRef}>
      {user && !error && !followers && (
        <div className="center-results">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      )}
      {error && (
        <div className="center-results">
          <span>{error.error}</span>
        </div>
      )}
      {!error && followers && (
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
