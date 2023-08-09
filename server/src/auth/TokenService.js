const { randomString } = require("../shared/generator");
const Token = require("./Token");
const Sequelize = require("sequelize");

const ONE_WEEK_IN_MILLIS = 7 * 24 * 60 * 60 * 1000;

const createToken = async (driver) => {
  // Generate a random 32 digit token
  const token = randomString(32);
  // Connect token to the driver creating it
  await Token.create({
    token,
    driverId: driver.id,
    lastUsedAt: new Date(),
  });
  // Return the token
  return token;
};

const verify = async (token) => {
  const oneWeekAgo = new Date(Date.now() - ONE_WEEK_IN_MILLIS);
  const tokenInDB = await Token.findOne({
    where: {
      token: token,
      lastUsedAt: {
        [Sequelize.Op.gt]: oneWeekAgo,
      },
    },
  });
  tokenInDB.lastUsedAt = new Date();
  await tokenInDB.save();
  const driverId = tokenInDB.driverId;
  return { id: driverId };
};

const deleteToken = async (token) => {
  // Find token with the authorization token sent from the frontend and delete
  await Token.destroy({ where: { token: token } });
};

const scheduleCleanup = () => {
  setInterval(async () => {
    const oneWeekAgo = new Date(Date.now() - ONE_WEEK_IN_MILLIS);
    await Token.destroy({
      where: {
        lastUsedAt: {
          [Sequelize.Op.lt]: oneWeekAgo,
        },
      },
    });
  }, 60 * 60 * 1000);
};

module.exports = { createToken, deleteToken, verify, scheduleCleanup };
