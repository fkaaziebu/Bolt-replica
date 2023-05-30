const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Model = Sequelize.Model;

class Profile extends Model {}

/*
Profile Class has two inputs for initialization
1. Object for attributes
2. Object for options
*/
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    referralCode: {
      type: Sequelize.STRING,
    },
    carModel: {
      type: Sequelize.STRING,
    },
    carYear: {
      type: Sequelize.STRING,
    },
    licensePlate: {
      type: Sequelize.STRING,
    },
    carColor: {
      type: Sequelize.STRING,
    },
    nationalId: {
      type: Sequelize.STRING,
    },
    driverLicense: {
      type: Sequelize.STRING,
    },
    profilePhoto: {
      type: Sequelize.STRING,
    },
    licenseFront: {
      type: Sequelize.STRING,
    },
    proofOfInsurance: {
      type: Sequelize.STRING,
    },
    roadworthinessSticker: {
      type: Sequelize.STRING,
    },
    ghanaCard: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, modelName: "profile" }
);

module.exports = Profile;