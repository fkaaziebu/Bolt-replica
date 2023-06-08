const path = require("path");
const fs = require("fs");

const readFileAsBase64 = (file) => {
  const filePath = path.join(file);
  return fs.readFileSync(filePath, { encoding: "base64" });
};

module.exports = readFileAsBase64;
