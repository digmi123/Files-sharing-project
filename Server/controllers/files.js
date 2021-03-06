const express = require('express')
const router = express.Router();
const {serverLogger} = require ('../logger')
const encrypt = require('node-file-encrypt');
const fs = require('fs');

// ------------------- Upload Files ------------------------
// MidlleWares
module.exports.updateDB = (req, res, next) => {
  let sql ="INSERT INTO files (physical_path, folder, type, size, name) VALUES ?";
  const values = req.files.map((file) => {
    return [
      file.encryptFileName,
      req.body.folder,
      file.mimetype,
      file.size,
      file.originalname,
    ];
  });

  let query = db.query(sql, [values]);

  query.on("error", function (err) {
    req.files.map((file) => {
      fs.unlink("./file/" + file.encryptFileName, function() {serverLogger.info(`Delet ${file.encryptFileName} due to error in DB`)})
    });
    serverLogger.error(err)
    res.status(500).send("There was an error uploading files to db");
  });

  query.on("result", function (result) {
    req.db = result;
    return next();
  });
};

module.exports.EncryptFiles = (req, res, next) => {
  try{
    req.files = req.files.map(function(file) {
      let f = new encrypt.FileEncrypt(file.path);
      f.openSourceFile();
      f.encrypt(config.ENCRYPTION_KEY);
      file = {...file,encryptFileName:f.encryptFileName}
      fs.unlink(file.path, function() {});
      return file;
    });
    return next();
  }
  catch(err){
    serverLogger.erorr(err)
    res.status(500).send("Error")
  }
}
// End Point
module.exports.uploadFiles = (req,res)=>{
  const {insertId,affectedRows} = req.db;
  serverLogger.info(`files id ${insertId}-${insertId + affectedRows - 1} updated to DB`);
  res.send("files uploaded successfuly")
}

// ------------------- Download Files ------------------------
// MidlleWares
module.exports.getFileData = (req, res, next) =>{
  try{
    const {fileID} = req.body
    let sql ="SELECT physical_path , name, id FROM files WHERE id = (?)";
    db.query(sql, [fileID],function (error, results){
      if (error) throw error;
      if(!results.length) return res.status(404).send("No file fond")
      req.db = results[0]
      return next()
    });    
  }catch(err){
    serverLogger.error(err)
    res.status(500).send("Error")
  }
}

module.exports.DecryptFiles = (req, res, next) => {
  try{
    const {physical_path,id} = req.DB
    serverLogger.info(`decrypt file ${id} start`)
    const path = "./files/" + physical_path
    let f = new encrypt.FileEncrypt(path);
    f.openSourceFile();
    f.decrypt(config.ENCRYPTION_KEY);
    req.decrypt = f;
    serverLogger.info(`decrypt file ${id} complete`)
    return next();
  }
  catch(err){
    serverLogger.error(err)
    res.status(500).send("Error")
  }
}

// End Point
module.exports.downloadFile = async (req, res) => {
  const {id} = req.db
  serverLogger.info(`sending file ${id} start`)
  res.sendFile(req.decrypt.decryptFilePath,{
    root : "./"
  }, function (err) {
      if (err) {
        serverLogger.error(err)
        return res.status(500).send("Error");
      } 
      fs.unlink("./" + req.decrypt.decryptFilePath, function() {
        serverLogger.info(`Cleaner ${id}`)
      });
      serverLogger.info(`sending file ${id} complete`)
  });
}