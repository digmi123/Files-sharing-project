import API from "../ApiEndPonts";
import axios from "axios";
import { update } from "../store/filesDataSlice";

const headers = { "x-access-token": localStorage.getItem("access-token")};

export const downloadFile = async (fileInfo) =>{
  if(fileInfo.type === "Folder") {
    console.error("you try to download a folder");
      return;
  }
  const data = new FormData();
  data.append("fileID", fileInfo.id);
  axios({
    method: 'post',
    url: API.files.downloadFile,
    data,
    responseType: 'blob',
    headers,
  })
  .then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileInfo.name);
    document.body.appendChild(link);
    link.click();
  })
  .catch((error => console.error(error.response.data)))
}

export const uploadFiles = async (filesData,files) => {
  const data = new FormData();
  data.append("folder", filesData.id);
  files.forEach(file => { data.append("files", file, file.name) });
  axios({ method: 'post', url: API.files.uploadFiles, data: data, headers,})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
};

export const deleteFiles = async (fileInfo) => {
    if(fileInfo.type === "Folder") return console.log("you try to delete a folder");
    const data = new FormData();
    data.append("fileID", fileInfo.id);
    axios({method: 'delete', url: API.files.deleteFile, data, headers,})
    .then(response => console.log(response.data))
    .catch((error => console.error(error.response.data)))
}

export const updateFilesData = (navigate) => async (dispatch) => {
  const data = new FormData();
  const projectID = localStorage.getItem("projectID");
  if(!projectID) navigate("/projects")
  data.append("projectID",projectID)
  axios({method: 'post', url: API.folders.getProjectTree, data, headers})
  .then(response=> dispatch(update(response.data)))
  .catch(error => navigate("/login",{ replace: true }))
}

export const rename = async (file,name) => {
  const url = file.type === "Folder" ? API.folders.renameFolder : API.files.renameFile;
  const data = new FormData();
  data.append("id", file.id);
  data.append("name", name);
  axios({method: 'post', url, data, headers})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}

export const createFolder = async (folderInfo) =>{
  const data = new FormData();
  data.append("parentId", folderInfo.id);
  data.append("name", "New Folder");
  axios({method: 'post', url : API.folders.createFolder, data, headers})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}

export const moveFile = async (source , destinationID) =>{
  const url = source.type === "Folder" ? API.folders.moveFolder : API.files.moveFile;
  const data = new FormData();
  data.append("destinationID", destinationID);
  data.append("sourceID", source.id);
  axios({method: 'post', url, data, headers})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}

export const deleteFolder = async (fileInfo) => {
  const data = new FormData();
  data.append("folderID", fileInfo.id);
  axios({method: 'post', url:API.folders.deleteFolder, data, headers})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}

export const getProjectsList = async (setList) => {
  axios({method: 'get', url:API.projects.getProjects, headers})
  .then(response => setList(response.data))
  .catch((error => console.error(error.response.data)))
}

export const createProject = async (data) => {
  axios({method: 'post', url:API.projects.createProject, data, headers})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}