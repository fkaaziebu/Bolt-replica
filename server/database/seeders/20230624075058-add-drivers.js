"use strict";
const bcrypt = require("bcrypt");
const FileService = require("../../src/file/FileService");
const path = require("path");
const fs = require("fs");

const readFileAsBase64 = (file = "test-png.png") => {
  const filePath = path.join(".", "__tests__", "resources", file);
  return fs.readFileSync(filePath, { encoding: "base64" });
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash("P4ssword", 10);
    const drivers = [];
    const profiles = [];
    const image = await FileService.saveImage(readFileAsBase64());

    for (let i = 0; i < 25; i++) {
      drivers.push({
        email: `user${i + 1}@mail.com`,
        contact: "0550815604",
        city: "Kumasi",
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      profiles.push({
        driverId: i + 1,
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
      });
    }

    await queryInterface.bulkInsert("drivers", drivers, {});
    await queryInterface.bulkInsert("profiles", profiles, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("drivers", null, {});
    await queryInterface.bulkDelete("profiles", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
