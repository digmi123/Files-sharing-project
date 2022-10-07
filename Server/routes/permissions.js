const express = require("express");
const router = express.Router();

const { getPermissionsList } = require("../controllers/permissions");

router.get("/permissionsList", getPermissionsList);

module.exports = router;
