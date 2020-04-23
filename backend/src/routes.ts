import { Server } from "@hapi/hapi";
import Twitch from "./twitch";

const setRoutes = (s: Server, t: Twitch) => {
  s.route({
    method: "GET",
    path: "/followers/{user}",
    options: {
      handler: async (req, h) => {
        const { user } = req.params;
        const followers = await t.getFollowers(user);
        return h.response(followers);
      },
    },
  });
};

export default setRoutes;
