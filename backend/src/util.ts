export type FetchSomething = (
  client_id: string,
) => (url: string) => Promise<any>;

export const fetchSomething: FetchSomething = (client_id: string) => {
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
