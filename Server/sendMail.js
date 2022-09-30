var nodemailer = require("nodemailer");
const dotenv = require("dotenv");

var fs = require("fs");

dotenv.config();

require.extensions[".html"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const sendEmail = (email, emailType, parameters) => {
  console.log(`The email: ${email}`);
  var html = require(`./emails/${emailType}`);

  for (let [key, val] of Object.entries(parameters)) {
    html = html.replace(`@${key}`, val);
  }

  // Create the transporter with the required configuration for Outlook
  // change the user and pass !
  var transporter = nodemailer.createTransport("SMTP", {
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // sender address
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
