import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TData from "../../stores/tdata";
import { useDebouncedCallback } from "use-debounce";
import { useChain, useSpring, useTransition } from "react-spring";

import Loader from "react-loader-spinner";

import { Theme } from "../../theme";

import Card from "../Card/card";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./results.scss";
import { TwitchFollowers } from "../../twitch_types";

type Props = {
  tData: TData;
};
const Results = observer(({ tData }: Props) => {
  const { data, error } = tData;

  //@ts-ignore
  const { user } = useParams();

  // const springRef = useRef<any>();
  // //@ts-ignore
  // const spring = useSpring({
  //   ref: springRef,
  //   to: {
  //     opacity: 1,
  //   },
  //   from: {
  //     opacity: 0,
  //   },
  //   config: {
  //     tension: 250,
  //   },
  // });
  // const len = data?.follows.length || 0;

  // const trailRef = useRef<any>();
  // const trans = useTransition(
  //   data ? data.follows : [],
  //   (follow: TwitchData.User) => follow._id,
  //   {
  //     //@ts-ignore
  //     ref: trailRef,
  //     from: { transform: "translateX(-100%)" },
  //     trail: 400 / len,
  //     enter: { opacity: 1, transform: "scale(1)" },
  //     leave: { opacity: 0, transform: "translateX(0%)" },
  //   }
  // );
  // useChain([springRef, trailRef]);

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
            {user} follows {data.data.length} streams
          </h1>
          <div className="inner-results">
            <div className="result-grid">
              {data.data.map((daum) => {
                console.log(JSON.stringify(daum));
                return <Card key={daum.to_id} daum={daum} />;
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
});

export default Results;
