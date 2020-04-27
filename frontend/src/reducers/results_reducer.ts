import { FTwitchData, ErrorMsg } from "../types";
import { Action } from "./main";

export type ResultsState = {
  followers: FTwitchData.RootChannel | null;
  error: ErrorMsg | null;
  offset: number;
};

const initState = {
  followers: null,
  error: null,
  offset: 0,
};

export const INIT_FOLLOWERS = Symbol("init_payload"),
  MERGE_FOLLOWERS = Symbol("merge_payload"),
  CHANGE_OFFSET = Symbol("offset"),
  ERROR_MSG = Symbol("error_msg"),
  RESET = Symbol("reset");

function ResultsReducer(
  state: ResultsState = initState,
  { type, payload }: Action
): ResultsState {
  switch (type) {
    case INIT_FOLLOWERS:
      const c = { ...state, followers: payload };
      return c;
    case ERROR_MSG:
      return { ...state, error: payload };
    case MERGE_FOLLOWERS:
      if (!state) return state;
      const copy = { ...state };
      if (copy.followers) {
        const follows = [...copy.followers.follows, ...payload.follows];
        copy.followers.follows = follows;
      }
      return copy;
    case RESET:
      console.log("resetting");
      return initState;
    case CHANGE_OFFSET:
      return { ...state, offset: payload };
    default:
      return state;
  }
}

export default ResultsReducer;
