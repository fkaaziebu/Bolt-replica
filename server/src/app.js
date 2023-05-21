const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DriverRouter = require("./driver/DriverRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(DriverRouter);


module.exports = app;
