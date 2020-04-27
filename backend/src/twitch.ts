import { fetchSomething } from "./util.ts";
import { TwitchData } from "./twitch_types.ts";
export type BErrorMsg = {
  error: string;
};

export default class Twitch {
  private client_id: string;
  public limit: number;
  constructor(client_id: string, limit: number) {
    this.client_id = client_id;
    this.limit = limit;
  }
  async getFollowers(
    user: string,
    offset: number | string,
  ): Promise<TwitchData.RootChannel | BErrorMsg> {
    const { data } = await this.getId(user);
    if (!data.length) {
      return { error: "No results were found" };
    }
    const { id } = data[0];
    const url =
      `https://api.twitch.tv/kraken/users/${id}/follows/channels?limit=${this
        .limit + "&offset=" + offset}`;
    const followers = await fetchSomething(url, this.client_id);
    return followers;
  }
  private async getId(user: string): Promise<TwitchData.IdRoot> {
    const url = `https://api.twitch.tv/helix/users?login=${user}`;
    const id = await fetchSomething(url, this.client_id);
    return id;
  }
}
// https://api.twitch.tv/kraken/users/' + id + '/follows/channels?limit=100&offset=' + 100*page
