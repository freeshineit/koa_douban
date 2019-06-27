// import errorHandler from "errorhandler";
import app from "./app";

// 

/**
 * Start Koa server.
 */
const server = app.listen(3000, () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    3000,
    'development'
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;