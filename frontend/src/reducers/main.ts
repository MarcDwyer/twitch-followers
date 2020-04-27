import { combineReducers } from "redux";
import RecentReducer from "./recent_reducer";
import ResultsReducer, { ResultsState } from "./results_reducer";

export type Action = {
  type: Symbol;
  payload: any;
};

export declare namespace ReduxStore {
  export interface Store {
    recently: string[];
    results: ResultsState;
  }
}

export default combineReducers({
  recently: RecentReducer,
  results: ResultsReducer,
});
