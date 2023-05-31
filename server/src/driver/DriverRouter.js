const express = require("express");
const Driver = require("./Driver");
const DriverService = require("./DriverService");
const { check, validationResult } = require("express-validator");
const ValidationException = require("../error/ValidationException");
const msg = require("../messages");

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
  check("contact").notEmpty().withMessage("Contact cannot be null"),
  check("city").notEmpty().withMessage("City cannot be null"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    await DriverService.save(req.body);
    return res.status(200).send({ message: "Driver created" });
  }
);

module.exports = router;
