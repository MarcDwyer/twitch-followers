import { NotFound } from "./follower_handler.ts";

export function makeUsersQuery(follows: NotFound): string {
    const prefix = "?id="
    let params = "";
    for (const follow of follows.values()) {
        const id = follow.value.to_id
        let trail = params.length > 0 ? `&id=${id}` : id 
        params += trail;
    }
    return prefix + params
}
let times = 0
export async function fetchTwitch<T>(url: string): Promise<T> {
    const clientId = Deno.env.get("CLIENTID"),
    oauth = Deno.env.get("OAUTH");
    if (!oauth || !clientId) throw new Error("Twitch credentials not found");
    ++times;
    console.log({times, url})
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

  export function trimAndLower(str: string) {
      return str.replace(/ /g,'').toLowerCase();
  }