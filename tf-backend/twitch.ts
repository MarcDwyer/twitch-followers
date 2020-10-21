import { TwitchData } from "./twitch_types.ts";
import { fetchTwitch } from "./util.ts";

export type BErrorMsg = {
  error: string;
};
const twitchKey = () => {
  const key = Deno.env.get("CLIENTID");
  if (!key) {
    throw new Error("No Twitch key was found");
  }
  return key;
};

export default class Twitch {
  private key = twitchKey();
  constructor(
    public limit: number,
  ) {}
  async getFollowers(
    userName: string,
    offset: number | string,
  ): Promise<TwitchData.RootChannel | BErrorMsg> {
    const userData = await this.getUserData(userName);
    if (!userData) {
      return { error: "No results were found" };
    }
    const url =
      `https://api.twitch.tv/kraken/users/${userData._id}/follows/channels?limit=${this
        .limit + "&offset=" + offset}`;
    const followerData = await fetchTwitch(url, this.key);
    return { ...followerData, viewing: userData };
  }
  private async getUserData(userName: string): Promise<TwitchData.User | null> {
    const url = `https://api.twitch.tv/kraken/users?login=${userName}`;
    const data: TwitchData.RootUser = await fetchTwitch(url, this.key);
    if (!data || data && !data.users.length) {
      return null;
    }
    const userData = data.users[0];
    return userData;
  }
}
