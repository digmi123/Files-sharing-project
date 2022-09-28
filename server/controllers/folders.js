const {serverLogger} = require('../logger');


module.exports.InsertNewFolderIntoDB = (req, res, next) => {
    try {
        const sql = "INSERT INTO folders (name, parent_id) VALUES (?,?);"
        const {name, parentId} = req.body
        let query = db.query(sql, [name, parentId])
        query.on("error", function (err) {
            serverLogger.error(err)
            res.status(500).send("There was an error uploading files to db");
        });
        query.on("result", function (result) {
            req.db = result;
            return next();
        });
    } catch (err) {
        serverLogger.error(err);
        res.status(500).send("Error")
    }
}

module.exports.insertRootFolderIntoDB = async (req, res, next) => {
    try {
        const sql = "INSERT INTO folders (name) VALUES ('root')"
        let query = db.query(sql)
        query.on("error", function (err) {
            serverLogger.error(err)
            res.status(500).send("There was an error uploading folder to db");
        });
        query.on("result", function (result) {
            req.foldersID = result.insertId;
            serverLogger.info(`root folder was created - folder id : ${result.insertId}`)
            return next();
        });
    } catch (err) {
        serverLogger.error(err);
        res.status(500).send("Error")
    }
}

module.exports.createFolder = async (req, res) => {
    const {insertId} = req.db;
    const {parentId} = req.body
    serverLogger.info(`folders id ${insertId} in ${parentId} was created in DB`);
    res.status(200).send("Folder created successfully");
}

const createFileTree = (folderID) => {
    return new Promise(async (res, rej) => {
        let sql = "SELECT id,type,name FROM files WHERE folder = (?)";
        db.query(sql, [folderID], function (error, results) {
            if (error) rej(error)
            res(results)
        });
    })
}

const createFolderTree = (folderID) => {
    return new Promise(async (res, rej) => {
        let sql = "SELECT * FROM folders WHERE parent_id = (?)";
        db.query(sql, [folderID], function (error, results) {
            if (error) rej(error)
            res(Promise.all(results.map(async (folder) => {
                return {
                    ...folder,
                    type: "Folder",
                    contains: await createTree(folder.id)
                }
            })))
        });
    })
}

const createTree = async (folderID) => {
    return [...await createFolderTree(folderID), ...await createFileTree(folderID)]
}

module.exports.findRootFolder = (req, res, next) => {
    const {projectID} = req.body;
    const sql = "SELECT folder_id FROM projects WHERE id=(?);"
    let query = db.query(sql, [projectID])
    query.on("error", function (err) {
        serverLogger.error(err)
        res.status(500).send("There was an error uploading files to db");
    });
    query.on("result", function (result) {
        req.folderID = result.folder_id;
        return next();
    });
}

module.exports.getFolder = async (req, res) => {
    try {
        const {folderID} = req;
        const sql = "SELECT * FROM folders WHERE id = (?)";
        const query = db.query(sql, [folderID])
        query.on("error", function (err) {
            serverLogger.error(err)
            res.status(500).send("There was an error uploading files to db");
        });
        query.on("result", async (result) => {
            res.status(200).json({
                ...result,
                type: "Folder",
                contains: await createTree(folderID)
            })
        });

    } catch {
        res.status(500).send("Error")
    }
}

module.exports.renameFolder = async (req, res) => {
    const sql = "UPDATE folders SET name = (?) WHERE id = (?);";
    const {name, id} = req.body;
    query = db.query(sql, [name, id]);
    query.on("error", (err) => {
        serverLogger.error(err)
        res.status(500).send("There was an error uploading files to db");
    })
    query.on("result", (result) => {
        res.status(200).send("Name Update successfully")
    });
}

module.exports.moveFolder = async (req, res) => {
    const {destinationID, sourceID} = req.body
    const sql = "UPDATE folders SET parent_id = (?) WHERE id = (?);";
    let query = db.query(sql, [destinationID, sourceID]);
    query.on("error", (err) => {
        serverLogger.error(err)
        res.status(500).send("There was an error uploading files to db");
    })
    query.on("result", (result) => {
        res.status(200).send("Location update successfully")
    });
}

// ------------ Delete Folder ---------------

const getAllSubFolders = async (folderIds) => {
    if (!folderIds.length) return [];
    return new Promise((resolve, reject) => {
        const sql = "select id from folders where parent_id in (?);"
        db.query(sql, [folderIds], async (error, results) => {
            if (error) reject(error);
            const list = results.map((item) => item.id)
            resolve([...list, ...await getAllSubFolders(list)])
        });
    })
}


module.exports.findSubFolders = async (req, res, next) => {
    try {
        serverLogger.debug("findSubFolders")
        const {folderID} = req.body
        req.folders = [folderID, ...await getAllSubFolders(folderID)]
        next()
    } catch (error) {
        serverLogger.error(error);
        res.status(500).send("Error");
    }
}

module.exports.findFolderFiles = (req, res, next) => {
    serverLogger.debug("findFolderFiles")
    const sql = "select * from files where folder in (?);"
    db.query(sql, [req.folders], (error, results) => {
        if (error) {
            serverLogger.error(error);
            res.status(500).send("Error");
        }
        req.files = results;
        next();
    })
}

module.exports.removeFoldersFromDB = (req, res) => {
    serverLogger.debug("removeFoldersFromDB")
    const IDs = req.folders
    const sql = "delete from folders where id in (?);"

    db.query(sql, [IDs], (error, results) => {
        if (error) {
            serverLogger.error(err)
            return res.status(500).send("There was an error deleting folders the db");
        }
        return res.status(200).send("folder has been successfully deleted")
    });
}
