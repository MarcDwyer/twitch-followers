import { TwitchData } from "./twitch_types.ts";

export type BErrorMsg = {
  error: string;
};

export default class Twitch {
  private fetchTwitch: (url: string) => Promise<any>;
  public limit: number;
  constructor(
    limit: number,
    fetchTwitch: (url: string) => Promise<any>,
  ) {
    this.limit = limit;
    this.fetchTwitch = fetchTwitch;
  }
  async getFollowers(
    user: string,
    offset: number | string,
  ): Promise<TwitchData.RootChannel | BErrorMsg> {
    const { data } = await this.getId(user);
    if (!data.length) {
      return { error: "No results were found" };
    }
    const channel = data[0];
    const url =
      `https://api.twitch.tv/kraken/users/${channel.id}/follows/channels?limit=${this
        .limit + "&offset=" + offset}`;
    const userData = await this.fetchTwitch(url);
    return { ...userData, viewing: channel };
  }
  private async getId(user: string): Promise<TwitchData.IdRoot> {
    const url = `https://api.twitch.tv/helix/users?login=${user}`;
    const id = await this.fetchTwitch(url);
    return id;
  }
}
// https://api.twitch.tv/kraken/users/' + id + '/follows/channels?limit=100&offset=' + 100*page
