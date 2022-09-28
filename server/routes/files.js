const express = require("express");
const router = express.Router();
const verifyToken = require("../auth");

const {
    EncryptFiles,
    updateDB,
    respondUpload,
    getFileData,
    DecryptFiles,
    sendFile,
    removeFromDB,
    deleteFile,
    renameFile,
    moveFile,
    cleanUp
} = require("../controllers/files");

router.use(verifyToken)
router.post("/upload", EncryptFiles, updateDB, respondUpload)
router.post("/download", getFileData, DecryptFiles, sendFile, cleanUp)
router.delete("/delete", getFileData, removeFromDB, deleteFile)
router.post("/rename", renameFile)
router.post("/move", moveFile)


module.exports = router;