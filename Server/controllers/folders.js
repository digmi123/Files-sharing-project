const express = require('express')
const {serverLogger} = require ('../logger')


module.exports.InsertNewFolderIntoDB = (req, res, next) => {
    try{
        const sql = "INSERT INTO folders (name, parent_id) VALUES (?,?);"
        const {name,parentId} = req.body
        let query = db.query(sql,[name,parentId])
        query.on("error", function (err) {
            serverLogger.error(err)
            res.status(500).send("There was an error uploading files to db");
        });
        query.on("result", function (result) {
            req.db = result;
            return next();
        });
    }catch(err){
        serverLogger.error(err);
        res.status(500).send("Error")
    }
}

module.exports.insertRootFolderIntoDB = async (req, res,next) => {
    try{
        const sql = "INSERT INTO folders (name) VALUES ('root')"
        let query = db.query(sql)
        query.on("error", function (err) {
            serverLogger.error(err)
            res.status(500).send("There was an error uploading folder to db");
        });
        query.on("result", function (result) {
            req.db.folders = result;
            serverLogger.info(`root folder was created for user ${req.db.users.insertId}`)
            return next();
        });
    }catch(err){
        serverLogger.error(err);
        res.status(500).send("Error")
    }
}

module.exports.createFolder = async (req, res) => {
  const {insertId} = req.db;
  const {parentId} = req.body
    serverLogger.info(`folders id ${insertId} in ${parentId} was created in DB`);
    res.status(200).send("Folder created successfuly");
}

const createFileTree = (folderID) => {
    return new Promise(async(res,rej)=>{
        let sql ="SELECT id,type,name FROM files WHERE folder = (?)";
        db.query(sql, [folderID],function (error, results){
            if(error) rej(error)
            res(results)
        });
    })
}

const createFolderTree = (folderID) =>{
    return new Promise(async(res,rej)=>{
        let sql ="SELECT * FROM folders WHERE parent_id = (?)";
        db.query(sql, [folderID],function (error, results){
            if(error) rej(error)
            res(Promise.all(results.map( async (folder) => {
                return {
                    ...folder,
                    type: "Folder",
                    contains : await createTree(folder.id)
                }
            })))
        });
    })
}

const createTree = async (folderID) =>{
    return [...await createFolderTree(folderID),...await createFileTree(folderID)]
}

module.exports.findRootFolder = (req, res, next) =>{
    const sql = "SELECT folder_id FROM `secure-collaboration`.users_folders WHERE user_id=(?);"
    let query = db.query(sql,[req.user.id])
    query.on("error", function (err) {
        serverLogger.error(err)
        res.status(500).send("There was an error uploading files to db");
    });
    query.on("result", function (result) {
        req.folderID = result.folder_id;
        return next();
    });
}

module.exports.setFolderID = (req, res, next) =>{
    req.folderID = req.body.folderID;
    next()
}

module.exports.getFolder = async (req, res) => {
    try{
        const {folderID} = req;
        const sql ="SELECT * FROM folders WHERE id = (?)";
        const query = db.query(sql,[folderID])
        query.on("error", function (err) {
            serverLogger.error(err)
            res.status(500).send("There was an error uploading files to db");
        });
        query.on("result", async (result) => {
            res.status(200).json({
                ...result,
                type: "Folder",
                contains : await createTree(folderID)
            })
        });
        
    }catch{
        res.status(500).send("Error")
    }   
}

module.exports.renameFolder = async (req, res) => {
    const sql = "UPDATE folders SET name = (?) WHERE id = (?);";
    const {name,id} = req.body;
    query = db.query(sql,[name,id]);
    query.on("error", (err)=>{
        serverLogger.error(err)
        res.status(500).send("There was an error uploading files to db");
    })
    query.on("result", (result) => {
        res.status(200).send("Name Update successfuly")
    });
}

module.exports.moveFolder = async (req, res) => {
    const {destinationID, sourceID} = req.body
    const sql = "UPDATE folders SET parent_id = (?) WHERE id = (?);";
    let query = db.query(sql,[destinationID, sourceID]);
    query.on("error", (err)=>{
        serverLogger.error(err)
        res.status(500).send("There was an error uploading files to db");
    })
    query.on("result", (result) => {
        res.status(200).send("Location update successfuly")
    });
}