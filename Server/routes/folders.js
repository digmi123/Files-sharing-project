const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")
const {findRootFolder,InsertNewFolderIntoDB,createFolder,getFolder,setFolderID,renameFolder} = require("../controllers/folders");

router.use(verifyToken)
router.post("/createFolder",InsertNewFolderIntoDB ,createFolder);
router.get("/getTree",findRootFolder,getFolder);
router.post("/getFolder",setFolderID,getFolder);
router.post("/renameFolder",renameFolder);

module.exports = router;