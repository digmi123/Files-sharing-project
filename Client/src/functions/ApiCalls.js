import API from "../ApiEndPonts";
import axios from "axios";

const headers = { "x-access-token": localStorage.getItem("token")};

const downloadFile = async (fileInfo) =>{
    if(fileInfo.type === "Folder") {
        console.log("you try to download a folder");
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
  .then(function (response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileInfo.name);
    document.body.appendChild(link);
    link.click();
  })
  .catch(function (error) {
    console.log(error);
  });
}

const uploadFiles = async (filesData,files) => {
  const data = new FormData();
  data.append("folder", filesData.id);
  files.forEach(file => { data.append("files", file, file.name) });
  const response = await axios({ method: 'post', url: API.files.uploadFiles, data: data, headers,})
  if(response.status === 200)
    return console.log(response.data)
  console.log(response);
};

const deleteFiles = async (fileInfo) => {
    if(fileInfo.type === "Folder") return console.log("you try to delete a folder");
    const data = new FormData();
    data.append("fileID", fileInfo.id);
    const response = await axios({method: 'delete', url: API.files.deleteFile, data, headers,})
    if(response.status === 200)
      return console.log(response.data)
    console.log(response);
}

const getFilesData = async () => {
  const response = await axios(API.folders.getTree,{headers})
  if(response.status === 200)
    return response.data
  console.log(response);
}

const rename = async (file,name) => {
  const url = file.type === "Folder" ? API.folders.renameFolder : API.files.renameFile;
  const data = new FormData();
  data.append("id", file.id);
  data.append("name", name);
  const response = await axios({method: 'post', url, data, headers})
  if(response.status === 200)
    return console.log(response.data)
  console.log(response);
}

const createFolder = async (folderInfo) =>{
  const data = new FormData();
  data.append("parentId", folderInfo.id);
  data.append("name", "New Folder");
  const response = await axios({method: 'post', url : API.folders.createFolder, data, headers})
  if(response.status === 200)
    return console.log(response.data)
  console.log(response);
}

const moveFile = async (source , destinationID) =>{
  const url = source.type === "Folder" ? API.folders.moveFolder : API.files.moveFile;
  const data = new FormData();
  data.append("destinationID", destinationID);
  data.append("sourceID", source.id);
  const response = await axios({method: 'post', url, data, headers})
  if(response.status === 200)
    return console.log(response.data)
  console.log(response);
}

export {downloadFile,uploadFiles,deleteFiles,getFilesData,rename,createFolder,moveFile}