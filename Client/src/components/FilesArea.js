import React from 'react'
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"

const uploadFiles = async (files) => {
  const data = new FormData();
  data.append("logicalPath", "Popen");
  files.forEach(file => {
    data.append("files", file,file.name);
  });
  axios({
      method: 'post',
      url: 'http://localhost:5000/files/uploadFiles',
      data: data
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
  };


function FilesArea() {

     const { getRootProps, getInputProps } = useDropzone({
       onDrop: (acceptedFiles) => {
        uploadFiles(acceptedFiles);
       },
     });


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop files here</p>

    </div>
  );
}

export default FilesArea