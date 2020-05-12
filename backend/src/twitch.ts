import { TwitchData } from "./twitch_types.ts";
import { fetchTwitch } from "./util.ts";

export type BErrorMsg = {
  error: string;
};
const twitchKey = () => {
  const key = Deno.env.get("TWITCH");
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
    user: string,
    offset: number | string,
  ): Promise<TwitchData.RootChannel | BErrorMsg> {
    const userData = await this.getId(user);
    if (!userData) {
      return { error: "No results were found" };
    }
    const [userId, displayName] = userData;
    const url =
      `https://api.twitch.tv/kraken/users/${userId}/follows/channels?limit=${this
        .limit + "&offset=" + offset}`;
    const followerData = await fetchTwitch(url, this.key);
    return { ...followerData, viewing: displayName };
  }
  private async getId(userName: string): Promise<string[] | null> {
    const url = `https://api.twitch.tv/kraken/users?login=${userName}`;
    const userData: TwitchData.RootUser = await fetchTwitch(url, this.key);
    if (!userData || userData && !userData.users.length) {
      return null;
    }
    const { display_name, _id } = userData.users[0];
    return [_id, display_name];
  }
}
