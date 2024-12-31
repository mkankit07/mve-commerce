const express = require("express");
const env = require("./configs/env");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./configs/db");
const bodyParser = require("body-parser");
const userAgent = require("express-useragent");
const requestIp = require("request-ip");
const logger = require("./configs/logger");
const startServer=require("./utils/server")
/**
 * Initialize
 */
const app = express();

/**
 * middlewares
 */
app.disable("x-powered-by");
app.use([
  helmet(),
  cors({
    origin: "*",
  }),
  bodyParser.json({
    limit: "20mb",
    type: "application/json",
  }),
  hpp(),
  userAgent.express(),
  requestIp.mw(),
]);

app.use("*", (req, res) => {
    res.status(400).json({message: "Invalid request"})
});

db.authenticate()
  .then(() => {
    console.log(`🚀 DATABASE CONNECTED 🚀`);
  })
  .catch((err) => {
    logger.error(err);
  });

db.sync().then(() => {
    startServer(app)
        .then((msg) => {
            console.log(msg);
        })
        .catch((error) => {
            logger.log({ level: "error", message: error.stack });
        });
})
.catch((error) => console.log(error));
