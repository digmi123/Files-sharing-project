const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")
const {findRootFolder,InsertNewFolderIntoDB,createFolder,fileTree} = require("../controllers/folders");

router.use(verifyToken)
router.post("/createFolder",InsertNewFolderIntoDB ,createFolder);
router.get("/getTree",findRootFolder,fileTree);

module.exports = router;