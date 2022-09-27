const { serverLogger } = require('../logger')
const encrypt = require('node-file-encrypt');
const fs = require('fs');

// ------------------- Upload Files ------------------------
// Middlewares
module.exports.updateDB = (req, res, next) => {
  let sql = "INSERT INTO files (physical_path, folder, type, size, name) VALUES ?";
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
            fs.unlink("./filesData/" + file.encryptFileName, (error) => {
                if (error) {
                    serverLogger.error(err)
                }
                serverLogger.info(`Deleted ${file.encryptFileName} due to error`)
            })
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
  try {
    req.files = req.files.map(function (file) {
      let f = new encrypt.FileEncrypt(file.path);
      f.openSourceFile();
      f.encrypt(env.ENCRYPTION_KEY);
      file = { ...file, encryptFileName: f.encryptFileName }
      fs.unlink(file.path, (erorr) => { if (erorr) serverLogger.error(err) });
      return file;
    });
    return next();
  }
  catch (err) {
    serverLogger.erorr(err)
    res.status(500).send("Error")
  }
}
// End Point
module.exports.uploadFiles = (req, res) => {
  const { insertId, affectedRows } = req.db;
  serverLogger.info(`files id ${insertId}-${insertId + affectedRows - 1} updated to DB`);
  res.send("files uploaded successfuly")
}

// ------------------- Download Files ------------------------
// MidlleWares
module.exports.getFileData = (req, res, next) => {
  try {
    const { fileID } = req.body
    let sql = "SELECT * FROM files WHERE id = (?)";
    db.query(sql, [fileID], function (error, results) {
      if (error) throw error;
      if (!results.length) return res.status(404).send("No file fond")
      req.db = results[0]
      return next()
    });
  } catch (err) {
    serverLogger.error(err)
    res.status(500).send("Error")
  }
}

module.exports.DecryptFiles = (req, res, next) => {
  try {
    const { physical_path, id } = req.db;
    serverLogger.info(`decrypt file ${id} start`);
    const path = "./filesData/" + physical_path;
    let f = new encrypt.FileEncrypt(path);
    f.openSourceFile();
    f.decrypt(env.ENCRYPTION_KEY);
    req.decrypt = f;
    serverLogger.info(`decrypt file ${id} complete`);
    return next();
  }
  catch (err) {
    serverLogger.error(err);
    res.status(500).send("Error");
  }
}


module.exports.sendFile = async (req, res, next) => {
  const { id } = req.db
  serverLogger.info(`sending file ${id} start`)
  res.sendFile(req.decrypt.decryptFilePath, { root: "./" },
    (err) => {
      if (err) { serverLogger.error(err); return res.status(500).send("Error"); }
      serverLogger.info(`sending file ${id} complete`)
      next()
    });
}

module.exports.cleanUp = (req, res) => {
  fs.unlink("./" + req.decrypt.decryptFilePath, (erorr) => {
    if (erorr) { serverLogger.error(err); return res.status(500).send("Error") };
    serverLogger.info(`Cleaner ${req.db.id}`)
  });
}

// ------------------- Delete Files ------------------------

module.exports.removeFromDB = (req, res, next) => {
  const { fileID } = req.body
  const sql = "DELETE FROM files WHERE id = (?);"
  let query = db.query(sql, [fileID]);

  query.on("error", function (err) {
    serverLogger.error(err)
    res.status(500).send("There was an error uploading the db");
  });

  query.on("result", function (result) {
    return next();
  });

}

module.exports.deleteFile = async (req, res) => {
  fs.unlink("./filesData/" + req.db.physical_path, (erorr) => {
    if (erorr) {
      serverLogger.error(err)
      return res.status(500).send("Error")
    };
    serverLogger.info(`user ${req.user.id} delete ${req.db.id} file`)
    res.status(200).send("file deleted successfully")
  });
}

// ---------------------------------------------------------

module.exports.renameFile = async (req, res) => {
  const sql = "UPDATE files SET name = (?) WHERE id = (?);";
  const { name, id } = req.body;
  query = db.query(sql, [name, id]);
  query.on("error", (err) => {
    serverLogger.error(err)
    res.status(500).send("There was an error uploading files to db");
  })
  query.on("result", (result) => {
    res.status(200).send("Name Update successfuly")
  });
}

module.exports.moveFile = async (req, res) => {
  const { destinationID, sourceID } = req.body
  const sql = "UPDATE files SET folder = (?) WHERE id = (?);";
  let query = db.query(sql, [destinationID, sourceID]);
  query.on("error", (err) => {
    serverLogger.error(err)
    res.status(500).send("There was an error uploading files to db");
  })
  query.on("result", (result) => {
    res.status(200).send("Location update successfuly")
  });
}


module.exports.removeLocalFiles = (req, res, next) => {
  serverLogger.debug("removeLocalFiles")
  const paths = req.files.map(item => item.physical_path)
  console.log(paths);
  paths.forEach(path => {
    fs.unlink("./filesData/" + path, (erorr) => {
      if (erorr) { serverLogger.error(err) };
      serverLogger.info(`Local file ${path} removed`)
    });
  });
  next()
}

module.exports.removeFilesFromDB = (req, res, next) => {
  serverLogger.debug("removeFilesFromDB")
  const IDs = req.files.map(item => item.id)
  const sql = "delete from files where id in (?)"
  if (!IDs.length) return next();
  const query = db.query(sql, [IDs])
  query.on("error", function (err) {
    serverLogger.error(err)
    res.status(500).send("There was an error deleting files the db");
  });

  query.on("result", function (result) {
    return next();
  });
}
