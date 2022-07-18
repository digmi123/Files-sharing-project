const express = require("express");
const router = express.Router();

const FilesController = require("../controllers/files");

router.post("/uploadFiles",FilesController.EncryptFiles, FilesController.updateDB,FilesController.uploadFiles)
router.post("/downloadFile",FilesController.getFileData, FilesController.DecryptFiles,FilesController.downloadFile)

module.exports = router;