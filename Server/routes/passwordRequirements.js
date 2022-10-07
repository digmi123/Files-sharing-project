const express = require("express");
const router = express.Router();

const passwordRequirementsController = require("../controllers/passwordRequiremnetsController");

router.get(
  "/getPasswordRequirements",
  passwordRequirementsController.getPassRequirements
);

module.exports = router;
