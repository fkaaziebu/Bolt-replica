const Driver = require("./Driver");

const save = async (body) => {
  const driver = { ...body };
  await Driver.create(driver);
};
module.exports = { save };
