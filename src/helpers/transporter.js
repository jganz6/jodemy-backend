const nodemailer = require("nodemailer");
const { admin_gmail_user, admin_gmail_password } = process.env;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: admin_gmail_user,
    pass: admin_gmail_password,
  },
});
module.exports = {
  transporter,
};
