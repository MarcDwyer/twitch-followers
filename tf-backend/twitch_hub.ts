import FetchMethods from "./fetch_methods.ts";
import FollowerHandler from "./follower_handler.ts";
import { trimAndLower } from "./my_util.ts";
import { TwitchLookUp } from "./twitch_types.ts";

export type BErrorMsg = {
  error: string;
};
export type UsersMap = Map<string, TwitchLookUp.User | BErrorMsg>


export default class TwitchHub {
  private users: UsersMap = new Map();

  constructor(
    public limit: number,
  ) {}
  async getData(
    username: string,
    cursor?: string,
  ): Promise<TwitchLookUp.MyData | BErrorMsg> {
    const user = await this.getUser(username)
    if ('error' in user) {
      return user;
    }
    const follows = await FetchMethods.fetchFollowers(user, cursor);
    const resolvedList = await new FollowerHandler(follows, this.users).resolveFollowers();
    return {
      cursor: follows.pagination.cursor,
      //@ts-ignore
      follows: resolvedList,
      _total: follows.total,
      viewing: user,
    };
  }
  // Get user if exists in Users Map if not fetch the user and cache it for future use
  async getUser(username: string): Promise<TwitchLookUp.User | BErrorMsg> {
    username = trimAndLower(username);
    let user = this.users.get(username);
    if (!user) {
        const isSet = await this.createUser(username);  
        if (!isSet) return {error: `Could not find ${username}`}
        user = this.users.get(username);   
    }
    if (!user) {
      return {error: `Error retrieving ${username}`}
    }
    return user;
  }
  // Fetches and caches user
  async createUser(username: string): Promise<boolean> {
    const user = await FetchMethods.fetchUsers(`?login=${username}`);
    if ('error' in user) return false;
    const userData = user.data[0];
    this.users.set(userData.login, userData);
    return true
  } 
}