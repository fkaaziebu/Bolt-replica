const { randomString } = require("../shared/generator");
const Token = require("./Token");

const createToken = async (driver) => {
  const token = randomString(32);
  await Token.create({
    token,
    driverId: driver.id,
    lastUsedAt: new Date(),
  });
  return token;
};

const deleteToken = async (token) => {
  await Token.destroy({ where: { token: token } });
};

const verify = async (token) => {
  const tokenInDB = await Token.findOne({
    where: {
      token: token,
    },
  });
  const driverId = tokenInDB.driverId;
  return { id: driverId };
};

module.exports = { createToken, deleteToken, verify };
