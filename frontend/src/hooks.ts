import { useState, useEffect } from "react";
import { FTwitchData } from "./types";

type ErrorMsg = {
  error: string;
};
type UseFollowersResults = [FTwitchData.RootChannel | null, ErrorMsg | null];

const fetchUser = async (
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
export const useFollowers = (
  user: string | undefined,
  offset: number
): UseFollowersResults => {
  const [followers, setFollowers] = useState<FTwitchData.RootChannel | null>(
    null
  );
  const [er, setEr] = useState<ErrorMsg | null>(null);
  useEffect(() => {
    (async () => {
      if (user) {
        const result = await fetchUser(user, offset);
        console.log(result);
        if ("error" in result) {
          setEr(result);
        } else {
          if (er) setEr(null);
          setFollowers(result);
        }
      }
    })();
  }, [user]);
  return [followers, er];
};
