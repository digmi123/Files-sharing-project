const express = require("express");
const router = express.Router();

const {captcha} = require("../controllers/users");
const {getUserFromDB,verifyPassword,sendToken} = require("../controllers/users");
const {register,emailNoExists,hashPassword,verifyPasswordRequirements,insertNewUserIntoDB,insertUsersFoldersIntoDB} = require("../controllers/users");
const {insertRootFolderIntoDB} = require("../controllers/folders");


router.post("/register",captcha, verifyPasswordRequirements, emailNoExists, hashPassword, insertNewUserIntoDB, insertRootFolderIntoDB, insertUsersFoldersIntoDB, register);
router.post("/login",captcha,getUserFromDB,verifyPassword,sendToken );

module.exports = router;
