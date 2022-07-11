const express = require("express");
const router = express.Router();

const FoldersController = require("../controllers/folders");

router.post("/createFolder",FoldersController.updateDB ,FoldersController.createFolder);
router.post("/getTree",FoldersController.fileTree);

module.exports = router;