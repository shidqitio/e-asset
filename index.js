const express = require("express");
const app = express();
const db = require("./src/config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const http = require("http");
const server = http.createServer(app);

require("dotenv").config();
require("dotenv").config({ path: __dirname + "/.env" });

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.use(require("./src/routes"));

app.use(require("./src/middlewares/errorHandler"));


db.sync()
  .then(() => {
    server.listen(process.env.SERVER_PORT, () =>
      console.log(`Server on port ${process.env.SERVER_PORT}`)
    );
  })
  .catch((err) => {
    console.log("error database", err);
  });
