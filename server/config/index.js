const test = require("./test");
const staging = require("./staging");
const development = require("./development");
const { log } = require("../src/shared/logger");

module.exports = {
  test,
  development,
  staging,
};
