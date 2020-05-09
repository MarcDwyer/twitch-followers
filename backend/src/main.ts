import { serve } from "https://deno.land/std@v0.42.0/http/server.ts";
import Twitch from "./twitch.ts";
import { fetchSomething } from "./util.ts";

type BodyData = {
  offset: number;
  user: string;
};

const port = 1337;

const s = serve({ port });
const fetchTwitch = fetchSomething();

const twitch = new Twitch(55, fetchTwitch);

const txtDecoder = new TextDecoder();
// deno run --allow-net --allow-env main.ts
for await (const req of s) {
  switch (req.url) {
    case "/followers/":
      const data = await Deno.readAll(req.body);
      const { user, offset }: BodyData = JSON.parse(txtDecoder.decode(data));
      const followerData = await twitch.getFollowers(user, offset);
      req.respond(
        {
          status: 200,
          body: JSON.stringify({ ...followerData, limit: twitch.limit }),
        },
      );
      break;
    default:
      req.respond(
        { status: 400, body: JSON.stringify({ error: "Route not found" }) },
      );
  }
}
