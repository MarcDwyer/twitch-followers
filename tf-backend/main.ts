import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import Twitch from "./twitch.ts";

type BodyData = {
  offset: number;
  user: string;
};

const port = 1337;


const twitch = new Twitch(55);

const router = new Router();

// const txtDecoder = new TextDecoder();

router.get("/followers/:user/:offset", async (ctx) => {
  const { user, offset } = ctx.params;
  if (!user) return;
  console.log(offset)
  const fd = await twitch.getFollowers(user, offset || 0);
 ctx.response.body = fd; 
})
router.allowedMethods({})
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(
  oakCors({
    origin: "http://localhost:3000"
  })
)

await app.listen({ port });