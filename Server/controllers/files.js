const express = require('express')
const router = express.Router();
const logger = require ('../logger')


const updateDB = (req, res, next) => {
  let sql ="INSERT INTO files (physical_path, logical_path, type, size, name) VALUES ?";

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
    logger.serverLogger.log('error', err)
    res.status(500).send("There was an error uploading files to db");
  });

  query.on("result", function (result) {
    res.locals.DB = result;
    return next();
  });
};

const EncryptFiles = (req, res, next) => {

}

router.post("/uploadFiles", updateDB, (req,res)=>{
  const {insertId,affectedRows} = res.locals.DB;
  logger.serverLogger.log('info',`files id ${insertId} - ${insertId + affectedRows - 1} updated to DB`);
  res.send("Multiple files uploaded successfuly to the db")
})

//--------------------------------------------------
const fs = require('fs');

router.post("/downloadFile", async (req, res) => {
  const {logical_path,name} = req.body
  let sql ="SELECT physical_path , name FROM files WHERE logical_path = (?) and name = (?)";
  let query = db.query(sql, [logical_path,name]);
  query.on("error", function (err) {
    logger.serverLogger.log('error', err)
    res.status(500).send("Erorr in Download File");
  });
  query.on("result", function (result) {
    const path = "./files/" + result.physical_path
    const file = fs.createReadStream(path)
    const filename = (new Date()).toISOString()
    res.setHeader('Content-Disposition', 'attachment: filename="' + result.name + '"')
    file.pipe(res)
  });
})


module.exports = router;