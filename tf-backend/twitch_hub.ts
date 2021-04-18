import API from "./api.ts";
import { BErrorMsg, TwitchFollowers, TwitchLookUp } from "./twitch_types.ts";

export type Credentials = {
  oauth: string;
  clientId: string;
};
export type UsersMap = Map<string, TwitchLookUp.User | BErrorMsg>;

export type GeneralData = {
  user: TwitchLookUp.User;
  follows: TwitchFollowers.RootFollowers;
};
type ResolveReqParams = {
  login: string;
  index: number;
  followers: TwitchLookUp.FollowsArray;
};
export default class TwitchHub {
  private api: API;

  private cache: UsersMap = new Map();

  constructor(public limit: number, creds: Credentials) {
    this.api = new API(creds);
  }

  async resolveReq({ login, index, followers }: ResolveReqParams) {
    const loginName = login.toLowerCase();
    const result = await this.api.getSingleUser(loginName);

    this.cache.set(loginName, result);
    followers[index] = result;
  }
  async getFollowerProfiles(
    tData: TwitchFollowers.RootFollowers
  ): Promise<TwitchLookUp.FollowsArray> {
    const followers: TwitchLookUp.FollowsArray = new Array(tData.data.length);

    const resolve: Promise<any>[] = [];

    tData.data.forEach((follow, index) => {
      const login = follow.to_name.toLowerCase();
      const cache = this.cache.get(login);
      if (cache) {
        followers[index] = cache;
        return;
      }
      resolve.push(this.resolveReq({ login, index, followers }));
    });
    await Promise.all(resolve);
    return followers;
  }
  async getData(
    username: string,
    cursor?: string
  ): Promise<BErrorMsg | TwitchLookUp.MyData> {
    try {
      const viewing = await this.api.getSingleUser(username);
      if ("error" in viewing) throw viewing;
      const follows = await this.api.getFollowers(viewing.id, cursor);
      const fup = await this.getFollowerProfiles(follows);

      return {
        viewing,
        follows: fup,
        cursor: follows.pagination.cursor,
        _total: follows.total,
      };
    } catch (e) {
      let err = typeof e === "string" ? e : JSON.stringify(e);
      return { error: err };
    }
  }
}
