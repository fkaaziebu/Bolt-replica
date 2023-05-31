const express = require("express");
const cors = require("cors");
const DriverRouter = require("./driver/DriverRouter");
const AuthenticationRouter = require("./auth/AuthenticationRouter");
const ErrorHandler = require("../src/error/ErrorHandler");
const FileService = require("./file/FileService");
const config = require("config");
const path = require("path");

const { uploadDir, profileDir } = config;
const profileFolder = path.join(".", uploadDir, profileDir);

const ONE_YEAR_IN_MILLIS = 365 * 24 * 60 * 60 * 1000;
FileService.createFolders();

const app = express();

app.use(cors());
app.use(express.json({ limit: "3mb" }));
app.use(
  "/images",
  express.static(profileFolder, { maxAge: ONE_YEAR_IN_MILLIS })
);
app.use(DriverRouter);
app.use(AuthenticationRouter);

// Middleware for error handling
app.use(ErrorHandler);

module.exports = app;
