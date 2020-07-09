const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../index.route");

const app = express();

const whitelist = ["http://localhost"];

const corsOptions = {
  origin: (origin, callback) => {
    const originUrl = origin || "";
    let originIsWhitelisted = false;
    whitelist.forEach((url) => {
      if (!originIsWhitelisted) {
        originIsWhitelisted = originUrl.indexOf(url) > -1;
      }
    });
    callback(null, originIsWhitelisted);
  },
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  // credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type"],
};

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", routes);

module.exports = app;
