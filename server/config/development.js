module.exports = {
  database: {
    database: "dms",
    username: "postgres",
    password: "1234",
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  mail: {
    service: "gmail",
    auth: {
      user: "haaziebu@gmail.com",
      pass: "jppevhqlnferfoeh",
    },
  },
  mailConfig: {
    from: "haaziebu@gmail.com",
  },
  uploadDir: "uploads-dev",
  profileDir: "profile",
  logFileName: "app-dev.log",
  logFolderName: "logs-dev/",
};
