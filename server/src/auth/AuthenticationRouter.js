const express = require("express");
const DriverService = require("../driver/DriverService");
const AuthenticationException = require("./AuthenticationException");
const TokenService = require("./TokenService");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const msg = require("../messages");

const router = express.Router();

router.post(
  "/api/1.0/auth",
  check("email").isEmail().withMessage(msg.authentication_failure),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new AuthenticationException());
    }

    const { email, password } = req.body;

    const driver = await DriverService.findByEmail(email);
    if (!driver) {
      return next(new AuthenticationException());
    }
    const match = await bcrypt.compare(password, driver.password);
    if (!match) {
      return next(new AuthenticationException());
    }

    const token = await TokenService.createToken(driver);
    const driverProfile = await DriverService.profileInfo(driver);

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
    } = driverProfile;

    res.send({
      id: driver.id,
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
      token,
    });
  }
);

router.post("/api/1.0/logout", async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.substring(7);
    await TokenService.deleteToken(token);
  }
  res.send();
});

module.exports = router;
