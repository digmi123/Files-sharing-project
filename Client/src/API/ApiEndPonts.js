const protocol_ = "http"
const addresses = "localhost"
const port = 5000

const server = `${protocol_}://${addresses}:${port}`

const headers = { "x-access-token": localStorage.getItem("access-token") };

const files = {
    upload: { method: 'post', url: server + "/files/upload", headers, },
    download: { method: 'post', url: server + "/files/download", responseType: 'blob', headers },
    deleteData: { method: 'delete', url: server + "/files/delete", headers },
    rename: { method: 'post', url: server + "/files/rename", headers },
    move: { method: 'post', url: server + "/files/move", headers },
}
const folders = {
    create: { method: 'post', url: server + "/folders/create", headers },
    getProjectTree: { method: 'post', url: server + "/folders/getProjectTree", headers },
    deleteData: { method: 'delete', url: server + "/folders/delete", headers },
    rename: { method: 'post', url: server + "/folders/rename", headers },
    move: { method: 'post', url: server + "/folders/move", headers },
}
const users = {
  register: { method: "post", url: server + "/users/register" },
  login: { method: "post", url: server + "/users/login" },
  forgotPassword: { method: "post", url: server + "/users/forgotPassword" },
  changePassword: { method: "post", url: server + "/users/changePassword" },
};
const projects = {
    getProjects: { method: 'get', url: server + "/projects/getProjects", headers },
    createProject: { method: 'get', url: server + "/projects/createProject", headers },
    editProject: { method: 'post', url: server + "/projects/editProject", headers },
}
const ps = {
    getPs: { method: 'get', url: server + "/passwordRequirements/getPasswordRequirements" },
}
const permissions = {
    permissionsList: { method: 'get', url: server + "/permissions/permissionsList" },
}

export { files, folders, users, projects, ps, permissions }