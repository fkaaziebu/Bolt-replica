const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Token = require("../auth/Token");
const Profile = require("./Profile");

const Model = Sequelize.Model;

class Driver extends Model {}

/*
Driver Class has two inputs for initialization
1. Object for attributes
2. Object for options
*/

Driver.init(
  {
    email: {
      type: Sequelize.STRING,
    },
    driverLicense: {
      type: Sequelize.STRING,
    },
    activationToken: {
      type: Sequelize.STRING,
    },
    isActivated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    passwordResetToken: {
      type: Sequelize.STRING,
    },
    failedLoginAttempts: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    isProfileComplete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "driver" }
);

Driver.hasMany(Token, { onDelete: "cascade", foreignKey: "driverId" });
Token.belongsTo(Driver, { onDelete: "cascade", foreignKey: "driverId" });
Driver.hasOne(Profile, { onDelete: "cascade", foreignKey: "driverId" });
Profile.belongsTo(Driver, { onDelete: "cascade", foreignKey: "driverId" });

module.exports = Driver;
