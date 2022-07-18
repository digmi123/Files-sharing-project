const passwordRequirements = require('../config')["password requirements"];
const {serverLogger} = require ('../logger')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


module.exports.login = async (req, res) => {
  const { password, email } = req.body;
  const sql = "SELECT id,username,email,hased_password FROM users WHERE email=(?)"
  db.query(sql, [email], async (error, results) => {
    if(error) return res.status(500).send("An error occurred");
    if(!results.length) return res.status(400).send("Email or Password is incorrect");
    const result = results[0]
    const isPasswordValid = await bcrypt.compare(password, result.hased_password);
    if (!isPasswordValid){
      return res.status(500).send("Email or Password is incorrect");
    }
    const {id} = result
    const token = jwt.sign({id}, process.env.TOKEN_KEY);
    return res.json({ token });
  });
}

module.exports.verifyPasswordRequirements = async (req, res,next) => {
  const password = req.body.password
  const valid = Object.values(passwordRequirements).every(requirement => {
    let re = new RegExp(requirement.regex)
    return !requirement.require | re.test(password)
  });
  if (!valid) {
    return res.status(400).send("the password don't pass the minimum requirements")
  }
  return next();
}

module.exports.emailNoExists = async (req, res,next) => {
  const {email} = req.body
  const sql = "SELECT id FROM users WHERE email=(?)"
  db.query(sql, [email],(error, results)=>{
    if(error) return res.status(500).send("An error occurred");
    if(results.length) return res.status(400).send("Email can`t be used");
    next();
  })
}

module.exports.hashPassword = async (req, res,next) => {
  try{
    req.body.password = await bcrypt.hash(req.body.password, 10)
    next()
  }catch(err){
    serverLogger.error(err)
    res.status(500).send("An error occurred")
  }
}

module.exports.insertNewUserIntoDB = async (req, res,next) => {
  const { username,email,password } = req.body;
  const sql = "INSERT INTO users (username, email, hased_password) VALUES (?,?,?)"
  var query = db.query(sql, [username,email,password])
  query.on("error", function (err) {
    serverLogger.error(err)
    res.status(500).send("There was an error updataing the DB");
  });
  query.on("result", function (result) {
    req.db = {users : result};
    serverLogger.info(`User id ${result.insertId} was created in the DB`)
    return next();
  });
}

module.exports.insertUsersFoldersIntoDB = async (req, res,next) => {
  const folderID = req.db.folders.insertId;
  const userID = req.db.users.insertId;
  const sql = "INSERT INTO users_folders (folder_id, user_id) VALUES (?,?)"
  var query = db.query(sql, [folderID,userID])
  query.on("error", function (err) {
    serverLogger.error(err)
    res.status(500).send("There was an error updataing the DB");
  });
  query.on("result", function (result) {
    req.db.UsersFolders = result;
    return next();
  });
}

module.exports.register = async (req, res) => {
  res.status(200).send("Registration completed successfully")
}