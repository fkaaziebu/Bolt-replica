const express = require("express");
const Driver = require("./Driver");
const DriverService = require("./DriverService");

const router = express.Router();

router.post("/api/1.0/drivers", async (req, res) => {
  await DriverService.save(req.body);
  return res.status(200).send({ message: "Driver created" });
});

module.exports = router;
