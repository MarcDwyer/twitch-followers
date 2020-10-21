import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TData from "../../stores/tdata";

import Loader from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";

import { Theme } from "../../theme";

import Card from "../Card/card";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./results.scss";

type Props = {
  tData: TData;
};
const Results = observer(({ tData }: Props) => {
  //@ts-ignore
  const { user } = useParams();
  console.log(tData);
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
  useEffect(() => {
    tData.fetchData(user);
  }, [user]);
  return <div className="main-results" ref={resRef}></div>;
});

export default Results;
