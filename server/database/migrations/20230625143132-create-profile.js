"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
      driverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "drivers",
          key: "id",
        },
        onDelete: "cascade",
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profiles");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
