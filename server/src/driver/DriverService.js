const Driver = require("./Driver");
const Profile = require("./Profile");
const FileService = require("../file/FileService");
const generatePassword = require("../shared/generatePassword");
const sequelize = require("../config/database");
const EmailService = require("../email/EmailService");
const EmailException = require("../email/EmailException");
const bcrypt = require("bcrypt");

const save = async (body) => {
  // Input for driver creation
  const { email, contact, city } = body;

  // Input for driver profile creation
  const {
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

  // Auto generate password for user
  const passwordGenerated = generatePassword();
  // Encrypt the password using bcrypt
  const hash = await bcrypt.hash(passwordGenerated, 10);

  // Transaction allows for saving or droping of driver table and profile
  const transaction = await sequelize.transaction();

  // Create driver
  const driver = await Driver.create(
    {
      email,
      contact,
      city,
      password: hash,
    },
    { transaction }
  );

  // Create Profile for the driver
  if (driver) {
    await Profile.create(
      {
        driverId: driver.id,
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
        profilePhoto: !profilePhoto
          ? null
          : await FileService.saveImage(profilePhoto),
        licenseFront: !licenseFront
          ? null
          : await FileService.saveImage(licenseFront),
        proofOfInsurance: !proofOfInsurance
          ? null
          : await FileService.saveImage(proofOfInsurance),
        roadworthinessSticker: !roadworthinessSticker
          ? null
          : await FileService.saveImage(roadworthinessSticker),
        ghanaCard: !ghanaCard ? null : await FileService.saveImage(ghanaCard),
      },
      { transaction }
    );


    try {
      // Send email of the password to be used for the account
      await EmailService.sendDriverPassword(email, passwordGenerated);
      // If everything goes well, save the table creations
      await transaction.commit();
    } catch (err) {
      // If anything goes wrong, rollback the table creations
      await transaction.rollback();
      // Send an email exception to frontend
      throw new EmailException();
    }
  }
};

const findByEmail = async (email) => {
  // Find a driver by a specific email and return
  return await Driver.findOne({ where: { email: email } });
};

const profileInfo = async (driver) => {
  // Return profile of a driver
  return await Profile.findOne({
    where: {
      driverId: driver.id,
    },
  });
};

module.exports = { save, findByEmail, profileInfo };
