const app = require("./src/app");
const Driver = require("./src/driver/Driver");
const Profile = require("./src/driver/Profile");
const bcrypt = require("bcrypt");
const sequelize = require("./src/config/database");
const fs = require("fs");
const path = require("path");
const FileService = require("./src/file/FileService");

const addDrivers = async () => {
  const hash = await bcrypt.hash("P4ssword", 10);

  const readFileAsBase64 = (file = "test-png.png") => {
    const filePath = path.join(".", "__tests__", "resources", file);
    return fs.readFileSync(filePath, { encoding: "base64" });
  };

  for (let i = 0; i < 10; i++) {
    const driver = await Driver.create({
      email: `user${i + 1}@mail.com`,
      contact: "0550815604",
      city: "Kumasi",
      password: hash,
    });

    const image = await FileService.saveImage(readFileAsBase64());

    if (driver) {
      await Profile.create({
        driverId: driver.id,
        firstName: "Frederick",
        lastName: "Aziebu",
        language: "English",
        referralCode: "",
        carModel: "Toyota-G4",
        carYear: "2023",
        licensePlate: "717 TTP",
        carColor: "red",
        nationalId: "304567876543",
        driverLicense: "AB2467876",
        profilePhoto: image,
        licenseFront: image,
        proofOfInsurance: image,
        roadworthinessSticker: image,
        ghanaCard: image,
        password: "P4ssword",
      });
    }
  }
};

sequelize.sync({ force: true }).then(async () => {
  await addDrivers();
});

app.listen(7000, () => {
  console.log("app is running...");
});
