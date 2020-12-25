import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import Twitch from "./twitch_hub.ts";

const port = 1337;

const twitch = new Twitch(55);

const router = new Router();

// const txtDecoder = new TextDecoder();

router.get("/followers/:user/:cursor", async (ctx) => {
  const { user } = ctx.params;
  let cursor = ctx.params.cursor;

  if (!user) return;
  if (cursor === "none") {
    cursor = undefined;
  }
  const fd = await twitch.getData(user, cursor);
  ctx.response.body = fd;
});
router.allowedMethods({});
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port });
