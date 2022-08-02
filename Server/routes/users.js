const express = require("express");
const router = express.Router();

const {captcha,register,login,emailNoExists,hashPassword,verifyPasswordRequirements,insertNewUserIntoDB,insertUsersFoldersIntoDB} = require("../controllers/users");
const {insertRootFolderIntoDB} = require("../controllers/folders");


router.post("/register",captcha, verifyPasswordRequirements, emailNoExists, hashPassword, insertNewUserIntoDB, insertRootFolderIntoDB, insertUsersFoldersIntoDB, register);
router.post("/login", login);

module.exports = router;
