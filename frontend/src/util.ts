import { FTwitchData, ErrorMsg } from "./types";

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

export const isInArray = (arr: Array<string>, user: string) => {
  const result = arr.indexOf(user);
  return result !== -1;
};

export const checkDupes = (followers: FTwitchData.ChannelData[]) => {
  const results: any = {};

  for (const { channel } of followers) {
    if (channel._id in results) {
      results[channel._id] = results[channel._id] + 1;
    } else {
      results[channel._id] = 1;
    }
  }
  return results;
};
