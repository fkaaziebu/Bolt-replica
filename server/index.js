const app = require("./src/app");
const sequelize = require("./src/config/database");
const { log } = require("./src/shared/logger");

sequelize.sync();

app.listen(7000, () => {
  log.info("app is running. version: " + process.env.npm_package_version);
});
