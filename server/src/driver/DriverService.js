const Driver = require("./Driver");
const Profile = require("./Profile");
const FileService = require("../file/FileService");

const save = async (body) => {
  const { email, contact, city, password } = body;
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
  const driver = await Driver.create({ email, contact, city, password });

  if (driver) {
    await Profile.create({
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
    });
  }
};

const findByEmail = async (email) => {
  return await Driver.findOne({ where: { email: email } });
};

const profileInfo = async (driver) => {
  return await Profile.findOne({
    where: {
      driverId: driver.id,
    },
  });
};

module.exports = { save, findByEmail, profileInfo };
