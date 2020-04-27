import { FTwitchData } from "../../types";
import { ErrorMsg } from "../../types";
import { initState } from "./results";

export type ResultsState = {
  followers: FTwitchData.RootChannel | null;
  error: ErrorMsg | null;
  offset: number;
};

export type Action = {
  type: Symbol;
  payload: any;
};

export const INIT_FOLLOWERS = Symbol("init_payload"),
  MERGE_FOLLOWERS = Symbol("merge_payload"),
  CHANGE_OFFSET = Symbol("offset"),
  ERROR_MSG = Symbol("error_msg"),
  RESET = Symbol("reset");

function ResultsReducer(
  state: ResultsState,
  { type, payload }: Action
): ResultsState {
  console.log(type);
  switch (type) {
    case INIT_FOLLOWERS:
      const c = { ...state, followers: payload };
      return c;
    case CHANGE_OFFSET:
      return { ...state, offset: payload };
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
      return initState;
    default:
      return state;
  }
}

export default ResultsReducer;
