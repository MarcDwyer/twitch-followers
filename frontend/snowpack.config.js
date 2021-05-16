const proxy = require("http2-proxy");

module.exports = {
  plugins: [
    [
      "@snowpack/plugin-sass",
      {
        /* see options below */
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {
      src: "/followers/.*",
      dest: (req, res) => {
        // remove /api prefix (optional)
        // req.url = req.url.replace(/^\/api/, "");
        return proxy.web(req, res, {
          hostname: "localhost",
          port: 1337,
        });
      },
    },
    { match: "routes", src: ".*", dest: "/index.html" },
  ],
};
