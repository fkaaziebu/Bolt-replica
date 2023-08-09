const Driver = require("./Driver");
const sequelize = require("../config/database");
const generatePassword = require("../shared/generatePassword");
const EmailService = require("../email/EmailService");
const EmailException = require("../email/EmailException");
const bcrypt = require("bcrypt");
const FIVE_MINUTES_IN_MILLIS = 5 * 60 * 1000;
const Sequelize = require("sequelize");
const Profile = require("./Profile");
const FileService = require("../file/FileService");

const save = async (body) => {
  const { email, driverLicense } = body;

  const oneTimePassword = generatePassword(10);
  const hash = await bcrypt.hash(oneTimePassword, 10);

  // Transaction allows for saving or droping of driver table and profile
  const transaction = await sequelize.transaction();

  const driver = await Driver.create(
    {
      email,
      driverLicense,
      activationToken: hash,
    },
    { transaction }
  );

  await Profile.create({driverId: driver.id}, { transaction });

  try {
    // Send email of the password to be used for the account
    await EmailService.sendDriverActivationToken(email, oneTimePassword);
    // If everything goes well, save the table creations
    await transaction.commit();
  } catch (err) {
    // If anything goes wrong, rollback the table creations
    await transaction.rollback();
    // Send an email exception to frontend
    throw new EmailException();
  }
};

const saveProfile = async (body) => {
  const {
    id,
    firstName,
    lastName,
    language,
    referralCode,
    carModel,
    carYear,
    licensePlate,
    carColor,
    nationalId,
    driverLicense,
    profilePhoto,
    licenseFront,
    proofOfInsurance,
    roadworthinessSticker,
    ghanaCard,
  } = body;

  const driverProfile = await Profile.findOne({ where: { driverId: id } });
  driverProfile.firstName = firstName;
  driverProfile.lastName = lastName;
  driverProfile.language = language;
  driverProfile.referralCode = referralCode;
  driverProfile.carModel = carModel;
  driverProfile.carYear = carYear;
  driverProfile.licensePlate = licensePlate;
  driverProfile.carColor = carColor;
  driverProfile.nationalId = nationalId;
  driverProfile.driverLicense = driverLicense;
  driverProfile.profilePhoto = profilePhoto;
  driverProfile.licenseFront = licenseFront;
  driverProfile.proofOfInsurance = proofOfInsurance;
  driverProfile.roadworthinessSticker = roadworthinessSticker;
  driverProfile.ghanaCard = ghanaCard;
  await driverProfile.save();

  let isProfileComplete = true;

  for (const attribute in driverProfile.dataValues) {
    const value = driverProfile.dataValues[attribute];
    if (attribute === "referralCode") {
      // Do nothing
    } else if (value === null || value === undefined || value === "") {
      isProfileComplete = false;
      break;
    }
  }

  return isProfileComplete;
};

const findByEmail = async (email) => {
  // Find a driver by a specific email and return
  return await Driver.findOne({ where: { email: email } });
};

const activate = async (driver, password) => {
  const hash = await bcrypt.hash(password, 10);
  driver.isActivated = true;
  driver.password = hash;
  driver.activationToken = null;

  await driver.save();
};

module.exports = { save, findByEmail, activate, saveProfile };
