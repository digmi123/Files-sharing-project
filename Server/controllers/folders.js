const express = require('express')
const router = express.Router();
const {serverLogger} = require ('../logger')


module.exports.updateDB = (req, res, next) => {
    try{
        const {name,parentId} = req.body
        const sql = "INSERT INTO folders (name, parent_id) VALUES ?"
        let query = db.query(sql,[name,parentId])

        query.on("error", function (err) {
            serverLogger.error(err)
            res.status(500).send("There was an error uploading files to db");
        });
        
        query.on("result", function (result) {
            req.DB = result;
            return next();
        });

    }catch(err){
        serverLogger.error(err);
        res.status(500).send("Error")
    }
}

module.exports.createFolder = async (req, res) => {
    serverLogger.info(`folders id ${insertId}-${insertId + affectedRows - 1} updated to DB`);
}

const createTree = (folderID) =>{
    return new Promise(async(res,rej)=>{
        let sql ="SELECT id,name FROM folders WHERE parent_id = (?)";
        db.query(sql, [folderID],function (error, results){
            if(error) rej(error)
            res(Promise.all(results.map( async (folder) => {
                return {
                    type: "Folder",
                    fileName: folder.name,
                    folderID : folder.id,
                    contains : await createTree(folder.id)
                }
            })))
        });
    })
}

module.exports.fileTree = async (req, res) => {
    const {folderId} = req.body
    const tree = await createTree(folderId)
    res.status(200).json(tree)
}