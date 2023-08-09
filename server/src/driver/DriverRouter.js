const express = require("express");
const msg = require("../messages");
const DriverService = require("./DriverService");
const { check, validationResult } = require("express-validator");
const ValidationException = require("../error/ValidationException");
const ForbiddenException = require("../error/ForbiddenException");
const Profile = require("./Profile");

const router = express.Router();

router.post(
  "/api/1.0/drivers",
  check("email")
    .notEmpty()
    .withMessage("Email cannot be null")
    .bail()
    .isEmail()
    .withMessage(msg.email_invalid)
    .bail()
    .custom(async (email) => {
      const driver = await DriverService.findByEmail(email);
      if (driver) {
        throw new Error(msg.email_inuse);
      }
    }),
  check("driverLicense")
    .notEmpty()
    .withMessage("Driver License cannot be null"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If any input validation errors, throw an exception
      return next(new ValidationException(errors.array()));
    }

    try {
      await DriverService.save(req.body);
      return res.send({ message: "Driver created" });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/api/1.0/drivers/profile/:id", async (req, res, next) => {
  const authenticatedDriver = req.authenticatedDriver;
  const { email } = req.body;
  // eslint-disable-next-line eqeqeq
  if (!authenticatedDriver || authenticatedDriver.id != req.params.id) {
    return next(new ForbiddenException("unauthorized_user_update"));
  }

  const driver = await DriverService.findByEmail(email);
  if (!driver) {
    return next(new DriverAuthenticationException());
  }

  try {
    req.body.id = req.params.id;
    const isProfileComplete = await DriverService.saveProfile(req.body);
    driver.isProfileComplete = isProfileComplete;
    await driver.save();

    return res.status(200).send({
      message: "Profile updated successfully",
      isProfileComplete,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/api/1.0/drivers/profile/:id", async (req, res, next) => {
  const authenticatedDriver = req.authenticatedDriver;

  // eslint-disable-next-line eqeqeq
  if (!authenticatedDriver || authenticatedDriver.id != req.params.id) {
    return next(new ForbiddenException("unauthorized_user_update"));
  }

  const driverProfile = await Profile.findOne({ where: { driverId: req.params.id } });

  res.status(200).send({
    driverProfile,
  });
});

module.exports = router;
