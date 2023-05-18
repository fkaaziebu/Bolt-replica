const Sequelize = require("sequelize");

/* 
The sequelize instance takes some few arguments for the
the database config:

1. Name for database
2. Name of user
3. Password for database connection
4. Object for providing optional arguments
*/
const sequelize = new Sequelize("dms", "dms-swe", "dms-pass", {
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

module.exports = sequelize;
