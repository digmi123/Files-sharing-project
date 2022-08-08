const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")

const {EncryptFiles,updateDB,uploadFiles,getFileData,DecryptFiles,downloadFile,removeFromDB,deleteFile,renameFile,moveFile} = require("../controllers/files");

router.use(verifyToken)
router.post("/uploadFiles",EncryptFiles, updateDB,uploadFiles)
router.post("/downloadFile",getFileData, DecryptFiles,downloadFile)
router.delete("/deleteFile",getFileData,removeFromDB,deleteFile)
router.post("/renameFile",renameFile)
router.post("/moveFile",moveFile)


module.exports = router;