require("dotenv").config();

module.exports = {
  database: {
    dbname: "postgre-db",
    host: "localhost",
    port: 5432,
    username: "postgres",
    dialect: "postgres",
    password: "Microsoft@2021",
    storage: "./database.sqlite",
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
