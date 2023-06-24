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
