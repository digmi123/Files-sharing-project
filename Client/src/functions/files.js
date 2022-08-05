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
      data: data,
      responseType: 'blob',
      headers,
  })
  .then(function (response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileInfo.name); //or any other extension
    document.body.appendChild(link);
    link.click();
  })
  .catch(function (error) {
    console.log(error);
  });
}

const uploadFiles = async (filesData,files,cb) => {
  const data = new FormData();
  data.append("folder", filesData.id);
  files.forEach(file => {
    data.append("files", file,file.name);
  });
  axios({
      method: 'post',
      url: API.files.uploadFiles,
      data: data,
      headers,
  })
  .then(function (response) {
      console.log(response);
      cb()
  })
  .catch(function (error) {
      console.log(error);
  });
};

const deleteFiles = async (fileInfo,cb) => {
  if(fileInfo.type === "Folder") {
    console.log("you try to delete a folder");
    return;
  }
  const data = new FormData();
  data.append("fileID", fileInfo.id);
  axios({
      method: 'delete',
      url: API.files.deleteFile,
      data: data,
      headers,
  })
  .then(function (response) {
      console.log(response);
      cb()
  })
  .catch(function (error) {
      console.log(error);
  });
};


export {downloadFile,uploadFiles,deleteFiles}