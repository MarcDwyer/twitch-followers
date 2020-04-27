import { config } from "https://deno.land/x/dotenv/dotenv.ts";
import { Server } from "https://deno.land/x/denotrain/mod.ts";
import Twitch from "./twitch.ts";

const { CLIENT } = config();

const twitch = new Twitch(CLIENT, 65);

const server = new Server({
  port: 1337,
});

server.get("/followers/:user/:offset", async (req) => {
  const { user, offset } = req.param;
  //@ts-ignore
  const followers = await twitch.getFollowers(user, offset);
  return { ...followers, limit: twitch.limit };
});

await server.run();
