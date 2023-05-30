const Driver = require("./Driver");
const Profile = require("./Profile");

const save = async (body) => {
  const { email, contact, city } = body;
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
  const driver = await Driver.create(driver);

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
    profilePhoto,
    licenseFront,
    proofOfInsurance,
    roadworthinessSticker,
    ghanaCard,
  });
};
module.exports = { save };
