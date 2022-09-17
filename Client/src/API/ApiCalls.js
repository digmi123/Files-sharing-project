import {files,folders,projects} from "./ApiEndPonts";
import axios from "axios";
import { update } from "../store/filesDataSlice";

export const downloadFile = async (fileInfo) =>{
  if(fileInfo.type === "Folder") {
    console.error("you try to download a folder");
      return;
  }
  const data = {fileID : fileInfo.id};
  axios({...files.download , data})
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

export const uploadFiles = async (folder,filesData) => {
  const data = new FormData();
  data.append("folder", folder.id);
  filesData.forEach(file => { data.append("files", file, file.name) });
  axios({ ...files.upload, data})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
};

export const deleteData = async (fileInfo) => {
  const {deleteData} = fileInfo.type === "Folder" ? folders : files;
    const data = {fileID:fileInfo.id}
    axios({...deleteData, data})
    .then(response => console.log(response.data))
    .catch((error => console.error(error.response.data)))
}

export const updateFilesData = (navigate) => async (dispatch) => {
  const projectID = localStorage.getItem("projectID");
  if(!projectID) navigate("/projects",{ replace: true })
  const data = {projectID}
  axios({...folders.getProjectTree, data})
  .then(response=> dispatch(update(response.data)))
  .catch(error => navigate("/login",{ replace: true }))
}

export const rename = async (file,name) => {
  const {rename} = file.type === "Folder" ? folders : files;
  const data = {id:file.id,name}
  axios({...rename, data})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}

export const createFolder = async (folderInfo) =>{
  const data = {parentId:folderInfo.id,name:"New Folder"}
  axios({...folders.create, data})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}

export const moveData = async (source , destinationID) =>{
  const {move} = source.type === "Folder" ? folders : files;
  const data = {destinationID,sourceID:source.id};
  axios({...move, data})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}

export const getProjectsList = async (setList) => {
  axios(projects.getProjects)
  .then(response => setList(response.data))
  .catch((error => console.error(error.response.data)))
}

export const createProject = async (data) => {
  axios({...projects.createProject, data})
  .then(response => console.log(response.data))
  .catch((error => console.error(error.response.data)))
}