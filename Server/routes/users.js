const express = require("express");
const router = express.Router();

const {captcha,
    getUserFromDB,verifyPassword,sendToken,
    register,emailNoExists,hashPassword,verifyPasswordRequirements,
    insertNewUserIntoDB,insertUsersFoldersIntoDB} = require("../controllers/users");
const {insertRootFolderIntoDB} = require("../controllers/folders");

router.use(captcha)
router.post("/register", verifyPasswordRequirements, emailNoExists, hashPassword, insertNewUserIntoDB, insertRootFolderIntoDB, insertUsersFoldersIntoDB, register);
router.post("/login",getUserFromDB,verifyPassword,sendToken );

module.exports = router;
