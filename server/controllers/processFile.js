const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './filesData')
    },
    filename: (req, file, callback) => {
        callback(null, "" + Date.now())
    }
});

const upload = multer({storage})

module.exports = upload;