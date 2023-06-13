const express = require("express");
const DriverService = require("./DriverService");
const { check, validationResult } = require("express-validator");
const ValidationException = require("../error/ValidationException");
const msg = require("../messages");
const FileService = require("../file/FileService");
const { logger } = require("../shared/logger");

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
    logger("", req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    await DriverService.save(req.body);
    return res.status(200).send({ message: "Driver created" });
  }
);

module.exports = router;
