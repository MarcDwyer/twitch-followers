import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TData from "../../stores/tdata";

import Loader from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";

import { Theme } from "../../theme";

import Card from "../Card/card";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./results.scss";

type Props = {
  tData: TData;
};
const Results = observer(({ tData }: Props) => {
  const { data, error } = tData;

  //@ts-ignore
  const { user } = useParams();

  const resRef = useRef<HTMLDivElement | null>(null);
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
  const [paginate] = useDebouncedCallback(() => {
    const isBottom = didScrollBottom();
    if (isBottom && tData) {
      console.log("fetching new data");
      tData.fetchData(user);
    }
  }, 250);

  useEffect(() => {
    tData.reset();
    tData.fetchData(user);
  }, [user]);

  useEffect(() => {
    if (resRef && resRef.current) {
      console.log("set listener");
      resRef.current.addEventListener("scroll", paginate);
    }

    return () => {
      resRef.current?.removeEventListener("scroll", paginate);
    };
  }, [resRef]);

  console.log(data);
  return (
    <div className="main-results" ref={resRef}>
      {user && !data && !error && (
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
      {data && (
        <React.Fragment>
          <h1>
            {user} follows {data._total} streams
          </h1>
          <div className="inner-results">
            <div className="result-grid">
              {data.follows.map(({ channel, created_at }, i) => {
                return (
                  <Card key={i} channel={channel} created_at={created_at} />
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
});

export default Results;
