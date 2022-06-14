const express = require('express')
const router = express.Router();

const upload = require('./processFile');


// router.get("/getFiles", FileController.getFiles);
// router.get("/getFile/:id", FileController.getFileById);

// router.post("/uploadSingleFile", upload.single('file'), (req, res)=>{
//     console.log(req.file);
//     res.send("file uploaded successfuly")
// })

const updateDB = (req, res, next) => {
  let sql =
    "INSERT INTO files (physical_path, logical_path, type, size, name) VALUES ?";

  const values = req.files.map((file) => {
    return [
      file.filename,
      req.body.logicalPath,
      file.mimetype,
      file.size,
      file.originalname,
    ];
  });

  let query = db.query(sql, [values]);
  query.on("error", function (err) {
    console.log(err)
    res.status(500).send("There was an error uploading files to db");
  });
  query.on("result", function () {
    return next();
  });
};

router.post("/uploadFiles", upload.array('files'), updateDB, (req,res)=>{
    console.log(req.files);
    res.send("Multiple files uploaded successfuly to the db")
})



module.exports = router;