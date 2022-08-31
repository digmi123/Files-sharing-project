const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")
const {findRootFolder,
    InsertNewFolderIntoDB,
    createFolder,
    getFolder,
    renameFolder,
    moveFolder,
    findSubfolders,
    findFolderFiles,
    removefoldersFromDB} = require("../controllers/folders");
const {removeLocalFiles,removeFilesFromDB} = require("../controllers/files")

router.use(verifyToken);
router.post("/create",InsertNewFolderIntoDB ,createFolder);
router.post("/getProjectTree",findRootFolder,getFolder);
router.post("/rename",renameFolder);
router.post("/move",moveFolder);
router.delete("/delete",findSubfolders,findFolderFiles,removeLocalFiles,removeFilesFromDB,removefoldersFromDB);

module.exports = router;