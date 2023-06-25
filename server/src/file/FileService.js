const fs = require("fs");
const path = require("path");
const config = require("config");
const FileType = require("file-type");
const { randomString } = require("../shared/generator");

const { uploadDir, profileDir } = config;
const profileFolder = path.join(".", uploadDir, profileDir);

const createFolders = () => {
  // Create folders on app initialization for profile image storage
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  if (!fs.existsSync(profileFolder)) {
    fs.mkdirSync(profileFolder);
  }
};

const saveImage = async (base64File) => {
  // Save image to profile folder
  const fileName = randomString(32);
  const filePath = path.join(profileFolder, fileName);
  await fs.promises.writeFile(filePath, base64File, "base64");
  return fileName;
};

const isSupportedFileType = async (buffer) => {
  // Check file support for file validation
  const type = await FileType.fromBuffer(buffer);
  return !type
    ? false
    : type.mime === "image/png" || type.mime === "image/jpeg";
};

module.exports = { createFolders, isSupportedFileType, saveImage };
