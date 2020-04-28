import { FTwitchData, ErrorMsg } from "../types";
import { Action } from "./main";

export type ResultsState = {
  userData: FTwitchData.RootChannel | null;
  error: ErrorMsg | null;
  offset: number;
  recently: string[];
};

const initState = {
  userData: null,
  error: null,
  offset: 0,
  recently: [],
};

export const INIT_FOLLOWERS = Symbol("init_payload"),
  MERGE_FOLLOWERS = Symbol("merge_payload"),
  CHANGE_OFFSET = Symbol("offset"),
  ERROR_MSG = Symbol("error_msg"),
  RESET = Symbol("reset"),
  SET_RECENT = Symbol("setrecent");

function ResultsReducer(
  state: ResultsState = initState,
  { type, payload }: Action
): ResultsState {
  switch (type) {
    case INIT_FOLLOWERS:
      const { recently, data } = payload;
      return { ...state, recently, userData: data };
    case ERROR_MSG:
      return { ...state, error: payload };
    case MERGE_FOLLOWERS:
      if (!state) return state;
      const copy = { ...state };
      if (copy.userData) {
        const { follows } = payload.data;
        const newFollows = [...copy.userData.follows, ...follows];
        copy.userData.follows = newFollows;
      }
      return copy;
    case RESET:
      return { ...state, offset: 0, userData: null, error: null };
    case CHANGE_OFFSET:
      return { ...state, offset: payload };
    case SET_RECENT:
      return { ...state, recently: payload };
    default:
      return state;
  }
}

export default ResultsReducer;
