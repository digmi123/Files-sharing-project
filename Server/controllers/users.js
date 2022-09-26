const passwordRequirements = require("../config")["password requirements"];
const { serverLogger } = require("../logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Axios = require("axios");
const sendMail = require("../sendMail");

module.exports.captcha = (req, res, next) => {
  return next(); // offline mode
  const { recaptcha } = req.body;
  Axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${config.CAPTCHA_KEY}&response=${recaptcha}`
  )
    .then((response) => {
      if (response.data.success) {
        return next();
      }
      return res.status(401).send("captcha");
    })
    .catch((error) => {
      serverLogger.error(error);
      return res.status(500).send("An error occurred in captcha");
    });
};

module.exports.getUserFromDB = async (req, res, next) => {
  const { password, email } = req.body;
  const sql = "SELECT id,email,hased_password FROM users WHERE email=(?)";
  db.query(sql, [email], async (error, results) => {
    if (error) {
      serverLogger.error(error);
      return res.status(500).send("An error occurred");
    }
    if (!results.length)
      return res.status(400).send("Email or Password is incorrect");
    req.db = { user: results[0] };
    next();
  });
};

module.exports.verifyPassword = async (req, res, next) => {
  const { hased_password } = req.db.user;
  const { password } = req.body;
  const isPasswordValid = await bcrypt.compare(password, hased_password);
  if (!isPasswordValid) {
    return res.status(500).send("Email or Password is incorrect");
  }
  next();
};

module.exports.sendToken = (req, res) => {
  const { id } = req.db.user;
  const options = { expiresIn: "30d" };
  const token = jwt.sign({ id }, config.TOKEN_KEY, options);
  return res.json({ token });
};

module.exports.verifyPasswordRequirements = async (req, res, next) => {
  const password = req.body.password;
  const valid = Object.values(passwordRequirements).every((requirement) => {
    let re = new RegExp(requirement.regex);
    return !requirement.require | re.test(password);
  });
  if (!valid) {
    return res
      .status(400)
      .send("the password don't pass the minimum requirements");
  }
  return next();
};

module.exports.emailNoExists = async (req, res, next) => {
  const { email } = req.body;
  const sql = "SELECT id FROM users WHERE email=(?)";
  db.query(sql, [email], (error, results) => {
    if (error) return res.status(500).send("An error occurred");
    if (results.length) return res.status(400).send("Email can`t be used");
    next();
  });
};

module.exports.sendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    // db.query(
    //   "SELECT * FROM users where email=(?)",
    //   [email],
    //   async (error, results, fields) => {
    //     if (error) {
    //       return res.status(500).send("An error occurred");
    //     }
    //     if (results.length === 0) {
    //       return res.status(400).send("The account not exists");
    //     }
    // const { id, email, firstName, lastName, password } = results[0];
    // const userKey = config.TOKEN_KEY + password;
    // const paylode = {
    //   id: id,
    //   email: email,
    // };
    // const token = jwt.sign(paylode, userKey, { expiresIn: "15m" });
    // const link = config.FRONT_URL + `/resetpass/${id}/${token}`;
    // console.log("link: ",link)
    sendMail(email);
    next();
  } catch (error) {
    //);
    return res.status(500).send("An error occurred");
  }
};

module.exports.hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
  } catch (err) {
    serverLogger.error(err);
    res.status(500).send("An error occurred");
  }
};

module.exports.insertNewUserIntoDB = async (req, res, next) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO users (email, hased_password) VALUES (?,?)";
  var query = db.query(sql, [email, password]);
  query.on("error", function (err) {
    serverLogger.error(err);
    res.status(500).send("There was an error updataing the DB");
  });
  query.on("result", function (result) {
    req.db = { users: result };
    serverLogger.info(`User id ${result.insertId} was created in the DB`);
    return next();
  });
};

module.exports.register = async (req, res) => {
  res.status(200).send("Registration completed successfully");
};
