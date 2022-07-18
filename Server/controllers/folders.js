const express = require('express')
const router = express.Router();
const {serverLogger} = require ('../logger')


module.exports.InsertNewFolderIntoDB = (req, res, next) => {
    try{
        const {name,parentId} = req.body
        const sql = "INSERT INTO folders (name, parent_id) VALUES ?"
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
            serverLogger.info("root folder was created")
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

const createfileTree = (folderID) => {
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
        let sql ="SELECT id,name FROM folders WHERE parent_id = (?)";
        db.query(sql, [folderID],function (error, results){
            if(error) rej(error)
            res(Promise.all(results.map( async (folder) => {
                return {
                    id : folder.id,
                    type: "Folder",
                    name: folder.name,
                    contains : createTree(folder.id)
                }
            })))
        });
    })
}

const createTree = async (folderID) =>{
    return [...await createFolderTree(folderID),...await createfileTree(folderID)]
}

module.exports.fileTree = async (req, res) => {
    try{
        const {folderId} = req.body
        const tree = await createTree(folderId);
        res.status(200).json(tree)
    }catch{
        res.status(500).send("Error")
    }   
}