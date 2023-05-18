const express = require("express");
const Driver = require("./driver/Driver");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/1.0/drivers", (req, res) => {
  Driver.create(req.body).then(() => {
    return res.status(200).send({ message: "Driver created" });
  });
});

module.exports = app;
