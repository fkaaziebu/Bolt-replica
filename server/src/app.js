const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DriverRouter = require("./driver/DriverRouter");
const ErrorHandler = require("../src/error/ErrorHandler");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(DriverRouter);

// Middleware for error handling
app.use(ErrorHandler);

module.exports = app;
