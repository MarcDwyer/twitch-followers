import { serve } from "https://deno.land/std@v0.42.0/http/server.ts";
import Twitch from "./twitch.ts";

type BodyData = {
  offset: number;
  user: string;
};

const twitch_client = Deno.env.get("TWITCH") || "gamering_time";

const port = 1337;

const s = serve({ port });

const twitch = new Twitch(twitch_client, 55);

const txtDecoder = new TextDecoder();

// deno run --allow-net --allow-read main.ts
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
