const express = require('express')
const router = express.Router();

const upload = require('./processFile');


// router.get("/getFiles", FileController.getFiles);
// router.get("/getFile/:id", FileController.getFileById);

router.post("/uploadSingleFile", upload.single('file'), (req, res)=>{
    console.log(req.file);
    res.send("file uploaded successfuly")
})

router.post("/uploadMultipleFiles", upload.array('files'), (req,res)=>{
    //console.log(req.body);
    console.log(req.files);
    res.send("Multiple files uploaded successfuly")
})


module.exports = router;