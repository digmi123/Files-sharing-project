const express = require("express");
const router = express.Router();

const {captcha,
    getUserFromDB,verifyPassword,sendToken,
    register,emailNoExists,hashPassword,verifyPasswordRequirements,
    insertNewUserIntoDB} = require("../controllers/users");

router.use(captcha)
router.post("/register", verifyPasswordRequirements, emailNoExists, hashPassword, insertNewUserIntoDB, register);
router.post("/login",getUserFromDB,verifyPassword,sendToken );

module.exports = router;
