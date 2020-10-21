import { serve } from "https://deno.land/std/http/server.ts";
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
// for await (const req of s) {
//   switch (req.url) {
//     case "/followers/":
//       const data = await Deno.readAll(req.body);
//       const { user, offset }: BodyData = JSON.parse(txtDecoder.decode(data));
//       const followerData = await twitch.getFollowers(user, offset);
//       req.respond(
//         {
//           status: 200,
//           body: JSON.stringify({ ...followerData, limit: twitch.limit }),
//         },
//       );
//       break;
//     default:
//       req.respond(
//         { status: 400, body: JSON.stringify({ error: "Route not found" }) },
//       );
//   }
// }
