import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import TwitchHub from "./twitch_hub.ts";

const port = 1337;

const router = new Router();

const oauth = Deno.env.get("FOAUTH"),
  clientId = Deno.env.get("FCLIENTID");

if (!oauth || !clientId) throw new Error("missing credentials");
const twitch = new TwitchHub(55, { oauth, clientId });

router.get("/followers/:user/:cursor", async (ctx) => {
  console.log(ctx);
  const { user } = ctx.params;
  let cursor = ctx.params.cursor;
  if (!user) return;
  if (cursor === "none") {
    cursor = undefined;
  }
  try {
    const fd = await twitch.getData(user, cursor);
    ctx.response.body = fd;
  } catch (e) {
    console.error(e);
  }
});

router.allowedMethods({});
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port });
