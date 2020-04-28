import { combineReducers } from "redux";
import ResultsReducer, { ResultsState } from "./results_reducer";

export type Action = {
  type: Symbol;
  payload: any;
};

export declare namespace ReduxStore {
  export interface Store {
    appData: ResultsState;
  }
}

export default combineReducers({
  appData: ResultsReducer,
});
