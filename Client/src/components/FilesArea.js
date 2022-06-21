import React from 'react'
import Uppy from "@uppy/core";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"
import Tus from "@uppy/tus";
import { DragDrop } from "@uppy/react";

const uppy = new Uppy({
  meta: { type: "avatar" },
  //restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
});

//uppy.use(Tus, { endpoint: "./" });

uppy.on("complete", (result) => {
  console.log("Drage completed");
});


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