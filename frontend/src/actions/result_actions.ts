import { Dispatch } from "redux";
import { fetchUser, isInArray } from "../util";
import {
  MERGE_FOLLOWERS,
  INIT_FOLLOWERS,
  ERROR_MSG,
} from "../reducers/results_reducer";
import { ReduxStore } from "../reducers/main";

type GetState = () => ReduxStore.Store;

export const getPagination = (user: string, offset: number) => (
  dispatch: Dispatch,
  getState: GetState
) => {
  fetchUser(user, offset)
    .then((data) => {
      console.log(data);
      if ("error" in data) throw data;
      const { appData } = getState();
      let recently = appData.recently;
      const check = isInArray(appData.recently, user);
      if (!check) {
        recently = [user, ...recently];
      }
      if (recently.length >= 20) recently = recently.slice(0, 20);
      setLS(recently);
      dispatch({
        type: offset ? MERGE_FOLLOWERS : INIT_FOLLOWERS,
        payload: {
          data,
          recently,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_MSG,
        payload: err,
      });
    });
};

const setLS = (recently: string[]) => {
  localStorage.setItem("recently", JSON.stringify(recently));
};
