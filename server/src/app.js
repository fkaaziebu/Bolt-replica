const express = require("express");
const cors = require("cors");
const config = require("config");
const path = require("path");
const ErrorHandler = require("../src/error/ErrorHandler");
const FileService = require("./file/FileService");
const DriverRouter = require("./driver/DriverRouter");
const DriverAuthenticationRouter = require("./auth/DriverAuthenticationRouter");
const tokenAuthentication = require("./middleware/tokenAuthentication");

const { uploadDir, profileDir } = config;
const profileFolder = path.join(".", uploadDir, profileDir);

const ONE_YEAR_IN_MILLIS = 365 * 24 * 60 * 60 * 1000;
// Folder creation on app initialization
FileService.createFolders();

const app = express();

app.use(cors());
app.use(express.json({ limit: "3mb" }));
// Static image route
app.use(
  "/images",
  express.static(profileFolder, { maxAge: ONE_YEAR_IN_MILLIS })
);
// Token route usage
app.use(tokenAuthentication);
// All routes for driver operations
app.use(DriverRouter);
// Authentication router
app.use(DriverAuthenticationRouter);
// Middleware for handling errors passed using the next function
app.use(ErrorHandler);

module.exports = app;
