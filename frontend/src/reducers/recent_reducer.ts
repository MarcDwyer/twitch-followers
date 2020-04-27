import { Action } from "./main";

export const ADD_RECENT = Symbol("addrecent"),
  SET_RECENT = Symbol("setter");

export default function RecentReducer(
  state: string[] | null = null,
  { type, payload }: Action
) {
  switch (type) {
    case SET_RECENT:
      return payload;
    case ADD_RECENT:
      if (state) {
        return [payload, ...state];
      }
    default:
      return state;
  }
}
