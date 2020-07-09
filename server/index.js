const config = require("./config/config");
const app = require("./config/express");
const db = require("../server/config/database");

app.listen(config.port, () => {
  console.info(`Server started on port ${config.port} (${config.env})`);
});

module.exports = { app };
