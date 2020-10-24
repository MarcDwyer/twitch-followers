import { UsersMap } from "./twitch.ts";
import { TwitchFollowers, TwitchLookUp } from "./twitch_types.ts";

export const LIMIT = 25;


export default class TwitchUser { 
    userData: TwitchLookUp.User | null = null;

    constructor(private username: string, private users: UsersMap) {};

    async getUserData() {
        const url = `https://api.twitch.tv/helix/users?login=${this.username}`;
        const data = await this.fetchTwitch<TwitchLookUp.RootLookUp>(url);
        if (!data || data && data.data && !data.data.length) {
          return null;
        }
        const user = data.data[0];
        this.userData = user
        this.users.set(this.username, this)
      }
      async getFollowers(pagination?: string): Promise<TwitchFollowers.RootFollowers> {
        const url = this.followerUrl(pagination);
        const results = await this.fetchTwitch<TwitchFollowers.RootFollowers>(url);
        return results;
      }
    private async fetchTwitch<T>(url: string): Promise<T> {
        const clientId = Deno.env.get("CLIENTID"),
        oauth = Deno.env.get("OAUTH");
        if (!oauth || !clientId) throw new Error("Twitch credentials not found");
        const f = await fetch(url, {
          headers: {
            // "Accept": "application/vnd.twitchtv.v5+json",
            "Authorization": `Bearer ${oauth}`,
            "Client-ID": clientId
          },
        });
        const data = await f.json();
        return data;
      } 

    private followerUrl(pagination?: string): string {
      if (!this.userData) throw new Error("Called followerUrl with no userData present");
      const { id } = this.userData;
      let url = `https://api.twitch.tv/helix/users/follows?from_id=${id}&first=${LIMIT}`;
      if (pagination) {
        url += `&after=${pagination}`
      }
      return url
    }
}