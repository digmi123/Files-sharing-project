var nodemailer = require("nodemailer");
const dotenv = require("dotenv");

var fs = require("fs");

dotenv.config();

require.extensions[".html"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const sendEmail = (email, emailType, parameters) => {
  var html = require(`./emails/${emailType}`);

  for (let [key, val] of Object.entries(parameters)) {
    html = html.replace(`@${key}`, val);
  }
  const transporter = nodemailer.createTransport("SMTP", {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "projecthit2022@gmail.com", // sender address
    to: email, // list of receivers
    subject: "test mail", // Subject line
    html: html, // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = sendEmail;
