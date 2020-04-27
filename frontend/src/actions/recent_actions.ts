import { ReduxStore } from "../reducers/main";
import { Dispatch } from "redux";
import { isInArray } from "../util";
import { ADD_RECENT } from "../reducers/recent_reducer";

type GetState = () => ReduxStore.Store;

export const addRecent = (search: string) => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const { recently } = getState();
  const check = isInArray(recently, search);
  if (!check) {
    setLS(search);
    dispatch({
      type: ADD_RECENT,
      payload: search,
    });
  }
};

const setLS = (user: string) => {
  const ls = localStorage.getItem("recently");
  if (ls) {
    let parsed: string[] = JSON.parse(ls);
    parsed = [user, ...parsed];
    localStorage.setItem("recently", JSON.stringify(parsed));
  } else {
    localStorage.setItem("recently", JSON.stringify([user]));
  }
};
