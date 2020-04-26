import { Server } from "@hapi/hapi";
import Twitch from "./twitch";

const setRoutes = (s: Server, t: Twitch) => {
  s.route({
    method: "GET",
    path: "/followers/{user}/{offset?}",
    options: {
      handler: async (req, h) => {
        const { user, offset } = req.params;
        const o = offset && offset.length ? parseInt(offset) : 0;
        console.log(o);
        const followers = await t.getFollowers(user, o);
        return h.response({ ...followers, limit: t.limit });
      },
    },
  });
};

export default setRoutes;
