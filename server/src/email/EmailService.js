const nodemailer = require("nodemailer");
const transporter = require("../config/emailTransporter");
const config = require("config");

const sendDriverPassword = async (email, password) => {
  const info = await transporter.sendMail({
    ...config.get("mailConfig"),
    to: email,
    subject: "DMS Password",
    html: `
    <div>
      <h1>Your DMS password</h1>
    </div>
    <div>
      Password is ${password}
    </div>
    `,
  });
  if (process.env.NODE_ENV === "development") {
    console.log("url: " + nodemailer.getTestMessageUrl(info));
  }
};

module.exports = { sendDriverPassword };
