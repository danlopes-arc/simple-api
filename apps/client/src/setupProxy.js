const { createProxyMiddleware } = require("http-proxy-middleware");

const serverPort = process.env.SEVER_PORT ?? 3001

module.exports = (app) =>  {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${serverPort}`,
      changeOrigin: true,
    })
  );
}