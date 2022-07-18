const express = require("express");
const router = express.Router();

const {register,login,emailNoExists,hashPassword,verifyPasswordRequirements,insertNewUserIntoDB,insertUsersFoldersIntoDB} = require("../controllers/users");
const {insertRootFolderIntoDB} = require("../controllers/folders");


router.post("/register", verifyPasswordRequirements, emailNoExists, hashPassword, insertNewUserIntoDB, insertRootFolderIntoDB, insertUsersFoldersIntoDB, register);
router.post("/login", login);

module.exports = router;
