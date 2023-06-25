const express = require("express");
const DriverService = require("../driver/DriverService");
const AuthenticationException = require("./AuthenticationException");
const TokenService = require("./TokenService");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const msg = require("../messages");
const { logger } = require("../shared/logger");

const router = express.Router();

// Driver authentication
router.post(
  "/api/1.0/auth",
  check("email").isEmail().withMessage(msg.authentication_failure),
  async (req, res, next) => {
    // Log any request coming to this route
    logger("", req);
    // Get every input error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If any validation error, throw an authentication exception
      return next(new AuthenticationException());
    }
    // Get the fields from the request
    const { email, password } = req.body;
    // Find the driver based on the email from the request
    const driver = await DriverService.findByEmail(email);
    if (!driver) {
      // If error because of no driver, return an authentication error
      return next(new AuthenticationException());
    }
    // Confirm if the password, in database is the same as that from the request
    const match = await bcrypt.compare(password, driver.password);
    if (!match) {
      // Throw an authentication exception when passwords don't match
      return next(new AuthenticationException());
    }

    // Generate token for frontend authorization
    const token = await TokenService.createToken(driver);
    // Get driver profile information to send to the frontend
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
      city: driver.city,
      contact: driver.contact,
      email: driver.email,
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
  // Log any request coming to this route
  logger("", req);
  // Get the authorization token from the request headers
  const authorization = req.headers.authorization;
  // If there exist an authorization token, delete token from
  // token table
  if (authorization) {
    const token = authorization.substring(7);
    await TokenService.deleteToken(token);
  }
  // Send a request to show logout
  res.send();
});

module.exports = router;
