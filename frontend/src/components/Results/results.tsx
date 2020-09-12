import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";

import { Theme } from "../../theme";

import { getPagination } from "../../actions/result_actions";
import { RESET, CHANGE_OFFSET } from "../../reducers/results_reducer";

import Card from "../Card/card";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./results.scss";

const Results = () => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const { appData } = useSelector((store: ReduxStore.Store) => store);
  const { userData, error, offset } = appData;

  const resRef = useRef<HTMLDivElement | null>(null);
  const listenerCount = useRef<number>(0);

  const didScrollBottom = () => {
    const { current } = resRef;
    if (current) {
      const sheight = current.scrollHeight,
        scrollTop = current.scrollTop,
        height = current.clientHeight;
      const res = sheight - scrollTop <= height + 500;
      return res;
    } else {
      return false;
    }
  };
  //Checks to see if you're fully scrolled down, if you are fetch paginated data
  const [paginate] = useDebouncedCallback(() => {
    const isBottom = didScrollBottom();
    if (isBottom && userData) {
      let newOffset = offset + userData.limit;
      if (newOffset <= userData._total) {
        console.log("fetching new data");
        dispatch({ type: CHANGE_OFFSET, payload: newOffset });
      }
    }
  }, 250);

  useEffect(() => {
    const { current } = resRef;
    if (current && !listenerCount.current) {
      current.addEventListener("scroll", paginate);
      listenerCount.current++;
    }
    return () => {
      if (current) current.removeEventListener("scroll", paginate);
      dispatch({ type: RESET });
    };
  }, []);

  useEffect(() => {
    if (user) {
      dispatch({ type: RESET });
      dispatch(getPagination(user, 0));
    }
  }, [user]);
  useEffect(() => {
    if (user && userData) {
      dispatch(getPagination(user, offset));
    }
  }, [offset]);
  return (
    <div className="main-results" ref={resRef}>
      {user && !error && !userData && (
        <div className="center-results">
          <Loader
            type="Puff"
            color={Theme.reallyLight}
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      )}
      {error && (
        <div className="center-results">
          <h2>{error.error}</h2>
        </div>
      )}
      {!error && userData && (
        <React.Fragment>
          <h1>
            {user} follows {userData._total} streams
          </h1>
          <div className="inner-results">
            <div className="result-grid">
              {userData.follows.map(({ channel, created_at }) => {
                return (
                  <Card
                    key={channel._id}
                    channel={channel}
                    created_at={created_at}
                  />
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Results;
