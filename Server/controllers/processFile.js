const express = require('express')
const multer = require('multer')

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, '../files')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '---' + file.originalname)
    }
});

const upload = multer({storage: fileStorageEngine})

module.exports = upload;