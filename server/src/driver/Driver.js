const Sequelize = require("sequelize");
const sequelize = require("../config/database");
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
    contact: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, modelName: "driver" }
);

Driver.hasOne(Profile, { onDelete: "cascade", foreignKey: "driverId"})

module.exports = Driver;