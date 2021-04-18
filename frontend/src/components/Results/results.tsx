import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TData from "../../stores/tdata";
import { useDebouncedCallback } from "use-debounce";

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
    if (
      isBottom &&
      tData &&
      tData.data &&
      tData.data?.follows.length < tData.data._total
    ) {
      console.log("fetching new data");
      tData.reqData(user);
    }
  }, 250);

  useEffect(() => {
    tData.reset();
    tData.reqData(user);
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
  return (
    <div className="main-results" ref={resRef}>
      {error && (
        <div className="center-results">
          <h2>{error.error}</h2>
        </div>
      )}
      {data && data.follows.length && (
        <React.Fragment>
          <h1>
            {data.viewing.display_name} follows {data._total} streams
          </h1>
          <div className="inner-results">
            <div className="result-grid">
              {data.follows.map((f) => {
                return <Card follow={f} style={{}} />;
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
});

export default Results;
