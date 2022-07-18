const express = require("express");
const router = express.Router();

const {InsertNewFolderIntoDB,createFolder,fileTree} = require("../controllers/folders");

router.post("/createFolder",InsertNewFolderIntoDB ,createFolder);
router.post("/getTree",fileTree);

module.exports = router;