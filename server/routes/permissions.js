const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")

const { getPermissionsList } = require("../controllers/permissions");

router.get("/permissionsList", getPermissionsList);
router.use(verifyToken)


module.exports = router;