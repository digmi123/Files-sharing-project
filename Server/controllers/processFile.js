const express = require('express')
const multer = require('multer')

const app = express();

const storage = multer.diskStorage({
    destination:(req, file, callback) =>{
        callback(null, './files')
    },
    filename: (req, file, callback) =>{
        callback(null, "" + Date.now())
    }
});

const upload = multer({storage})

module.exports = upload;