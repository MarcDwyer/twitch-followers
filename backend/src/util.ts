import fetch from "node-fetch";

export const fetchSomething = async (url: string, id?: string) => {
  try {
    const f = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": id,
      },
    });
    const results = await f.json();
    return results;
  } catch (err) {
    console.error(err);
    return null;
  }
};
