const protocol_ = "http"
const addresses = "localhost"
const port = 5000

const server = `${protocol_}://${addresses}:${port}`

const API = {
    files : {
        uploadFiles : server+"/files/uploadFiles",
        downloadFile : server+"/files/downloadFile",
        deleteFile : server+"/files/deleteFile",
    },
    folders:{
        createFolder:server+"/folders/createFolder",
        getTree:server+"/folders/getTree",
    },
    users:{
        register:server+"/users/register",
        login:server+"/users/login",
    },
    ps:{
        getPs:server+"/passwordRequirements/getPasswordRequirements",
    },
}

export default API