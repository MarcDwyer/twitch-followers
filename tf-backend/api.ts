import { Credentials } from "./twitch_hub.ts";
import { TwitchLookUp, TwitchFollowers, BErrorMsg } from "./twitch_types.ts";

export default class API {
  limit = 55;
  reattempts: number[] = [];
  private english = /^[A-Za-z0-9]*$/;

  constructor(private creds: Credentials) {}

  async fetchTwitch<T>(url: string): Promise<T> {
    const { oauth, clientId } = this.creds;

    const f = await fetch(url, {
      headers: {
        // "Accept": "application/vnd.twitchtv.v5+json",
        Authorization: `Bearer ${oauth}`,
        "Client-ID": clientId,
      },
    });
    const data = await f.json();
    return data;
  }
  async fetchUsers(
    query: string
  ): Promise<TwitchLookUp.RootLookUp | BErrorMsg> {
    const url = `https://api.twitch.tv/helix/users${query}`;
    const data = await this.fetchTwitch<TwitchLookUp.RootLookUp>(url);
    if (!data || (data && data.data && !data.data.length)) {
      return { error: "no results found" };
    }
    return data;
  }

  async getSingleUser(login: string) {
    const test = this.english.test(login);
    if (!test) throw "Only accept queries in english";
    const url = "https://api.twitch.tv/helix/users?login=" + login;
    let result: TwitchLookUp.User | BErrorMsg;
    try {
      const data = await this.fetchTwitch<TwitchLookUp.RootLookUp>(url);
      if (!data || (data.data && !data.data.length) || !data.data) {
        throw "No stream found here";
      }
      result = data.data[0];
    } catch (e) {
      console.log(`Couldnt find: ${login}`);
      if (typeof e !== "string") e = JSON.stringify(e);
      result = { error: e };
    }
    //@ts-ignore
    return result;
  }

  getFollowers(id: string, cursor?: string) {
    let url = `https://api.twitch.tv/helix/users/follows?from_id=${id}&first=${this.limit}`;
    if (cursor) {
      url += `&after=${cursor}`;
    }
    return this.fetchTwitch<TwitchFollowers.RootFollowers>(url);
  }

  // async fetchFollowers(
  //   user: TwitchLookUp.User,
  //   cursor?: string
  // ): Promise<TwitchFollowers.RootFollowers> {
  //   let url = `https://api.twitch.tv/helix/users/follows?from_id=${user.id}&first=${this.limit}`;
  //   console.log(url);
  //   if (cursor) {
  //     url += `&after=${cursor}`;
  //   }
  //   const followers = await this.fetchTwitch<TwitchFollowers.RootFollowers>(
  //     url
  //   );

  //   return followers;
  // }
}
