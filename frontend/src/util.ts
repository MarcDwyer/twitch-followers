import { FTwitchData, ErrorMsg } from "./types";

// content-type: application/json, accept: */*, content-length: 32, base_url: localhost
export const fetchUser = async (
  user: string,
  offset: number,
): Promise<ErrorMsg | FTwitchData.RootChannel> => {
  try {
    const url = "/followers/";
    const payload = {
      user,
      offset,
    };
    const f = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const results = await f.json();
    return results;
  } catch (err) {
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


export function delay(ms: number): Promise<void> {
  return new Promise((res): number =>
    setTimeout((): void => {
      res();
    }, ms)
  );
}