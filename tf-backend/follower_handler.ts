import FetchMethods from "./fetch_methods.ts";
import { makeUsersQuery, trimAndLower } from "./my_util.ts";
import  { BErrorMsg, UsersMap } from "./twitch_hub.ts";
import { TwitchFollowers, TwitchLookUp } from "./twitch_types.ts";

export type UnresFollower = {
    index: number,
    value: TwitchFollowers.Daum;
    checked: boolean;
}

export type NotFound = Map<string, UnresFollower>;

export type ResolvedList = Array<TwitchLookUp.User | BErrorMsg>;

export default class FollowerHandler {

    constructor(private followers: TwitchFollowers.RootFollowers, private users: UsersMap) {};
/**
 * resolveFollowers will search each individual follower's userData in the cache
 * and if not found will compile a list to fetch the follower's data later and cache it.
 * Remember that the initial follower fetch request returns the followers sorted by followed_at date, that order must still be maintained as we resolve the followers.
 */
   async resolveFollowers(): Promise<ResolvedList> {
    const { data } = this.followers;

    const notFound: NotFound = new Map();
    const resolvedList = this.createResolvedList();
    for (let x = 0; x < data.length; x++) {
        const follower = data[x];
        const name = trimAndLower(follower.to_name);
        let user = this.users.get(name);
        if (!user) {
            notFound.set(name, {
                index: x,
                value: follower,
                checked: false
            });
        } else {
            resolvedList[x] = user;
        }
    }
    if (!notFound.size) return resolvedList;
    await this.setNotFound(notFound);
    for (const {value, index} of notFound.values()) {
        const name = trimAndLower(value.to_name)
        resolvedList[index] = this.users.get(name) || {error: `Could not find ${name}`};
    }
    return resolvedList;
}
/**
 * setNotFound creates a query to send to Twitch's API, retrieving the notFound follower's userData than caching it.
 * Some followers might be banned which will result in an error, this is remembered by using the checked property.
 * If a follower returns an error it must be remembered by the cache later on.
 */
private async setNotFound(notFound: NotFound) {
    const query = makeUsersQuery(notFound);
    const payload = await FetchMethods.fetchUsers(query);
    if ('error' in payload) return;

    for (const user of payload.data) {
        const name = trimAndLower(user.display_name)
        this.users.set(name,{
            ...user,
            followed_at: notFound.get(name)?.value.followed_at || "never"
        }); 
        const found = notFound.get(name);
        if (found) found.checked = true;
    }
    for (const not of notFound.values()) {
        if (!not.checked) {
            const name = trimAndLower(not.value.to_name)
            this.users.set(name, {error: `Error finding ${name}`})
        }
    }
}
/**
 * @returns an array with a length similar to the requested followers array. Order must be maintained!
 */
   private createResolvedList() {
       const { data } = this.followers;
        const resolved: ResolvedList= []
        resolved.length = data.length;
        return resolved;
    }
}