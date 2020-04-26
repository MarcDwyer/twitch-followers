import Hapi from "@hapi/hapi";
import setRoutes from "./routes";
import { config } from "dotenv";

import Twitch from "./twitch";

config();

const { CLIENT } = process.env;

const server = new Hapi.Server({
  port: 1337,
  host: "localhost",
  routes: {
    cors: true,
  },
});

async function main() {
  const twitch = new Twitch(CLIENT, 35);
  setRoutes(server, twitch);
  await server.start();
}

main().catch((err) => console.log(err));
