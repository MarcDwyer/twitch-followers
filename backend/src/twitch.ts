import { fetchSomething } from "./util";
import { TwitchData } from "./twitch_types";

export default class Twitch {
  private client_id: string;
  constructor(client_id: string) {
    this.client_id = client_id;
  }
  async getFollowers(user: string): Promise<TwitchData.RootChannel> {
    const { data } = await this.getId(user);
    const { id } = data[0];
    const url = `https://api.twitch.tv/kraken/users/${id}/follows/channels?limit=100`;
    const followers = await fetchSomething(url, this.client_id);
    return followers;
  }
  async getId(user: string): Promise<TwitchData.IdRoot> {
    const url = `https://api.twitch.tv/helix/users?login=${user}`;
    const id = await fetchSomething(url, this.client_id);
    return id;
  }
}
// https://api.twitch.tv/kraken/users/' + id + '/follows/channels?limit=100&offset=' + 100*page
