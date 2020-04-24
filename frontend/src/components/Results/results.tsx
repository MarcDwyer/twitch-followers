import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FTwitchData } from "../../types";

type ErrorMsg = {
  error: string;
};
type UseFollowersResults = [FTwitchData.RootChannel | null, ErrorMsg | null];
const fetchUser = async (
  user: string
): Promise<ErrorMsg | FTwitchData.RootChannel> => {
  try {
    console.log(process.env.NODE_ENV);
    const f = await fetch(`/followers/${user}`);
    const results = await f.json();
    return results;
  } catch (err) {
    console.log(err);
    return { error: "Error reaching server" };
  }
};
const useFollowers = (user: string | undefined): UseFollowersResults => {
  const [followers, setFollowers] = useState<FTwitchData.RootChannel | null>(
    null
  );
  const [er, setEr] = useState<ErrorMsg | null>(null);
  useEffect(() => {
    (async () => {
      if (user) {
        const result = await fetchUser(user);
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
const Results = () => {
  const { user } = useParams();
  const [followers, err] = useFollowers(user);
  console.log(followers, err);
  return <span>{user}</span>;
};

export default Results;