const express = require("express");
const Driver = require("./Driver");
const DriverService = require("./DriverService");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/api/1.0/drivers",

  check("email").notEmpty().withMessage("Email cannot be null"),
  check("contact").notEmpty().withMessage("Contact cannot be null"),
  check("city").notEmpty().withMessage("City cannot be null"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors.array().forEach((error) => {
        validationErrors[error.path] = error.msg;
      });
       
      return res.status(400).send({ validationErrors: validationErrors });
    }

    await DriverService.save(req.body);
    return res.status(200).send({ message: "Driver created" });
  }
);

module.exports = router;
