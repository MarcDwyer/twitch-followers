import { fetchTwitch } from "./my_util.ts";
import { BErrorMsg } from "./twitch_hub.ts";
import { TwitchLookUp, TwitchFollowers } from "./twitch_types.ts";

export default class FetchMethods { 
    static limit = 55;
    static async fetchUsers(query: string): Promise<TwitchLookUp.RootLookUp | BErrorMsg> {
        const url = `https://api.twitch.tv/helix/users${query}`
        const data = await fetchTwitch<TwitchLookUp.RootLookUp>(url);
        if (!data || data && data.data && !data.data.length) {
          return {error: "no results found"};
        }
        return data;
      }

      static async fetchFollowers(user: TwitchLookUp.User, cursor?: string): Promise<TwitchFollowers.RootFollowers> {
        let url = `https://api.twitch.tv/helix/users/follows?from_id=${user.id}&first=${this.limit}`;
        if (cursor) {
          url += `&after=${cursor}`;
        }
        const followers = await fetchTwitch<TwitchFollowers.RootFollowers>(url);
    
        return followers
      }
}