import { TwitchFollowers, TwitchLookUp } from "./twitch_types.ts";
import TwitchUser from "./twitch_user.ts";

export type BErrorMsg = {
  error: string;
};
export type UsersMap = Map<string, TwitchUser>

export default class Twitch {
  private users: UsersMap = new Map();

  constructor(
    public limit: number,
  ) {}
  async getFollowers(
    username: string,
    pagination?: string,
  ): Promise<TwitchLookUp.User[] | BErrorMsg> {
    const user = await this.getUser(username)
    if ('error' in user) {
      return user;
    }

    const follows = await user.getFollowers(pagination);
    console.log(follows)
    const pkgFollows = await this.packageFollowers(follows);
    return pkgFollows;
  }
  async getUser(username: string): Promise<TwitchUser | BErrorMsg> {
    username = username.toLowerCase();
    let user: null | undefined | TwitchUser = this.users.get(username);
    if (!user) {
        await new TwitchUser(username, this.users).getUserData();   
        user = this.users.get(username);   
    }
    if (!user) {
      return { error: "No results were found" };
    }
    return user;
  }
  private async packageFollowers(f: TwitchFollowers.RootFollowers) {
    const pkgFollows: TwitchLookUp.User[] = [];
    for (const follower of f.data) {
      try {
        const user = await this.getUser(follower.to_name.toLowerCase());
        if ('error' in user) throw user;
        if (user && user.userData) {
          console.log(`pushed: ${user.userData.login}`)
          pkgFollows.push(user.userData);
        }
      } catch(e) {
        console.error(`error: ${follower.to_name}`)
      }
    }
    return pkgFollows;
  }

}

// https://api.twitch.tv/helix/streams?user_login=

// GET https://api.twitch.tv/helix/users/follows?from_id=<user ID>
// GET https://api.twitch.tv/helix/users/follows?to_id=<user ID>