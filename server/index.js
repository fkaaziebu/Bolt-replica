const app = require("./src/app");
const sequelize = require("./src/config/database");
const { log } = require("./src/shared/logger");

const TokenService = require("./src/auth/TokenService");

sequelize.sync();

TokenService.scheduleCleanup();

app.listen(7000, () => {
  log.info("app is running. version: " + process.env.npm_package_version);
});
