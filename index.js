const express = require("express");
const app = express();
const db = require("./src/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const log4js = require("log4js");
const logger = log4js.getLogger();

const http = require("http");
const server = http.createServer(app);

require("dotenv").config();
require("dotenv").config({ path: __dirname + "/.env" });

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());

app.use(require("./src/routes"));

app.use(require("./src/middlewares/errorHandler"));

logger.level = "debug";
logger.debug("Some Debug Message");

db.sync()
  .then(() => {
    server.listen(process.env.SERVER_PORT, () =>
      console.log(`Server on port ${process.env.SERVER_PORT}`)
    );
  })
  .catch((err) => {
    console.log("error database", err);
  });
