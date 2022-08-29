const protocol_ = "http"
const addresses = "localhost"
const port = 5000

const server = `${protocol_}://${addresses}:${port}`

const API = {
    files : {
        uploadFiles: server+"/files/uploadFiles",
        downloadFile: server+"/files/downloadFile",
        deleteFile: server+"/files/deleteFile",
        renameFile: server+"/files/renameFile",
        moveFile: server+"/files/moveFile"
    },
    folders:{
        createFolder: server+"/folders/createFolder",
        getProjectTree: server+"/folders/getProjectTree",
        getFolder: server+"/folders/getFolder",
        renameFolder: server+"/folders/renameFolder",
        moveFolder: server+"/folders/moveFolder",
        deleteFolder: server+"/folders/deleteFolder"
    },
    users:{
        register: server+"/users/register",
        login: server+"/users/login",
    },
    projects:{
        getProjects:server+"/projects/getProjects",
        createProject:server+"/projects/createProject"
    },
    ps:{
        getPs: server+"/passwordRequirements/getPasswordRequirements",
    },
}

export default API