const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")
const {findRootFolder,InsertNewFolderIntoDB,createFolder,getFolder,setFolderID,renameFolder,moveFolder,findSubfolders,findFolderFiles,removefoldersFromDB} = require("../controllers/folders");
const {removeLocalFiles,removeFilesFromDB} = require("../controllers/files")

router.use(verifyToken);
router.post("/createFolder",InsertNewFolderIntoDB ,createFolder);
router.post("/getProjectTree",findRootFolder,getFolder);
router.post("/getFolder",setFolderID,getFolder);
router.post("/renameFolder",renameFolder);
router.post("/moveFolder",moveFolder);
router.post("/deleteFolder",findSubfolders,findFolderFiles,removeLocalFiles,removeFilesFromDB,removefoldersFromDB);

module.exports = router;