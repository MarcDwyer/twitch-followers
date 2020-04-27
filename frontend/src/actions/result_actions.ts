import { Dispatch } from "redux";
import { fetchUser } from "../util";
import {
  MERGE_FOLLOWERS,
  INIT_FOLLOWERS,
  ERROR_MSG,
} from "../reducers/results_reducer";

export const getPagination = (user: string, offset: number) => (
  dispatch: Dispatch
) => {
  fetchUser(user, offset).then((payload) => {
    if ("error" in payload) {
      dispatch({
        type: ERROR_MSG,
        payload,
      });
      return;
    }
    dispatch({
      type: offset ? MERGE_FOLLOWERS : INIT_FOLLOWERS,
      payload,
    });
  });
};
