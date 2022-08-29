const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")

const {getPermissionsList} = require("../controllers/permissions");

router.use(verifyToken)
router.get("/permissionsList", getPermissionsList);

module.exports = router;