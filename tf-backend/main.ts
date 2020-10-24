import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import Twitch from "./twitch.ts";


const port = 1337;


const twitch = new Twitch(55);

const router = new Router();

// const txtDecoder = new TextDecoder();

router.get("/followers/:user/:pagination", async (ctx) => {
  const { user } = ctx.params;
  let pagination = ctx.params.pagination;

  if (!user) return;
  if (pagination === "none") {
    pagination = undefined
  }
  console.log({user, pagination})
  const fd = await twitch.getFollowers(user, pagination);
  console.log(fd);
  ctx.response.body = fd; 
})
router.allowedMethods({})
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port });