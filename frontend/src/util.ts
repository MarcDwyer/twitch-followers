import { FTwitchData, ErrorMsg } from "./types";

export function debounce(func: Function, duration: number) {
  let timer: undefined | number;
  console.log("called debounce");
  return function () {
    const args = arguments,
      //@ts-ignore
      ctx = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(ctx, args);
    }, duration);
  };
}

export const fetchUser = async (
  user: string,
  offset: number
): Promise<ErrorMsg | FTwitchData.RootChannel> => {
  try {
    const url = `/followers/${user}/${offset}`;
    const f = await fetch(url);
    const results = await f.json();
    return results;
  } catch (err) {
    console.log(err);
    return { error: "Error reaching server" };
  }
};
