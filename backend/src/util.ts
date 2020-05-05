export type FetchSomething = () => (url: string) => Promise<any>;

export const fetchSomething: FetchSomething = () => {
  const client_id = Deno.env.get("TWITCH");
  if (!client_id) {
    throw new Error("No Twitch client_id was found");
  }
  return async (url: string) => {
    try {
      const f = await fetch(url, {
        method: "GET",
        //@ts-ignore
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          "Client-ID": client_id,
        },
      });
      const results = await f.json();
      return results;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
};
