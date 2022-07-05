const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};

/**
 * make a proxy If anyone tries to visit the root of /auth/google
 * on our REACT server automatically for the request on to localhost:5000
 */