const express = require("express");
const router = express.Router();

const {
  captcha,
  getUserFromDB,
  verifyPassword,
  sendToken,
  register,
  emailNoExists,
  hashPassword,
  verifyPasswordRequirements,
  insertNewUserIntoDB,
  sendVerificationEmail,
  checkIfEmailExist,
  createLink,
  sendForgotPasswordEmail,
} = require("../controllers/users");

router.use(captcha);
router.post(
  "/register",
  verifyPasswordRequirements,
  emailNoExists,
  hashPassword,
  insertNewUserIntoDB,
  sendVerificationEmail,
  register
);
router.post("/login", getUserFromDB, verifyPassword, sendToken);
router.post(
  "/forgotPassword",
  checkIfEmailExist,
  createLink,
  sendForgotPasswordEmail
);

module.exports = router;
