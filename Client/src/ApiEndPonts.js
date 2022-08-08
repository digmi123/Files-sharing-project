const protocol_ = "http"
const addresses = "localhost"
const port = 5000

const server = `${protocol_}://${addresses}:${port}`

const API = {
    files : {
        uploadFiles : server+"/files/uploadFiles",
        downloadFile : server+"/files/downloadFile",
        deleteFile : server+"/files/deleteFile",
        renameFile : server+"/files/renameFile",
        moveFile : server+"/files/moveFile"
    },
    folders:{
        createFolder:server+"/folders/createFolder",
        getTree:server+"/folders/getTree",
        getFolder:server+"/folders/getFolder",
        renameFolder:server+"/folders/renameFolder",
        moveFolder:server+"/folders/moveFolder"
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