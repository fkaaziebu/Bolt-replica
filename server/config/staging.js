module.exports = {
  database: {
    database: "dms",
    username: "dms-swe",
    password: "dms-pass",
    dialect: "sqlite",
    storage: "./staging.sqlite",
    logging: false,
  },
  mail: {
    host: "localhost",
    port: 8587,
    tls: {
      rejectUnauthorized: false,
    },
  },
  mailConfig: {
    from: "My App <info@my-app.com>",
  },
  uploadDir: "uploads-staging",
  profileDir: "profile",
  logFileName: "app-staging.log",
  logFolderName: "logs-staging/",
};
