import { config } from "https://deno.land/x/dotenv/dotenv.ts";
import { serve } from "https://deno.land/std@v0.36.0/http/server.ts";
import Twitch from "./twitch.ts";

type BodyData = {
  offset: number;
  user: string;
};

const { CLIENT, PORT } = config();

const port = PORT ? parseInt(PORT) : 1337;

const s = serve({ port });

const twitch = new Twitch(CLIENT, 55);

const txtDecoder = new TextDecoder();

// deno --allow-net --allow-read main.ts
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
