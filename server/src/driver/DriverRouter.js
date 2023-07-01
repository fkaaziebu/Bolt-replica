const express = require("express");
const DriverService = require("./DriverService");
const { check, validationResult } = require("express-validator");
const ValidationException = require("../error/ValidationException");
const msg = require("../messages");
const FileService = require("../file/FileService");
const { logger } = require("../shared/logger");

const router = express.Router();

// Driver creation with profile
// Field verification using express-validator
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
  check([
    "profilePhoto",
    "licenseFront",
    "proofOfInsurance",
    "roadworthinessSticker",
    "ghanaCard",
  ]).custom(async (imageAsBase64String) => {
    if (!imageAsBase64String) {
      return true;
    }
    const buffer = Buffer.from(imageAsBase64String, "base64");

    const supportedType = await FileService.isSupportedFileType(buffer);
    if (!supportedType) {
      throw new Error(msg.unsupported_image_file);
    }

    return true;
  }),
  async (req, res, next) => {
    // Logging any request coming to this route
    logger("", req);

    // Getting errors due to input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If any input validation errors, throw an exception
      return next(new ValidationException(errors.array()));
    }

    try {
      // Save user to database
      await DriverService.save(req.body);
      // Send response for a successful driver creation
      return res.status(200).send({ message: "Driver created" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
